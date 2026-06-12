import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

const continents = [
  { id: "todos", name: "Todos", icon: "🌍" },
  { id: "europa", name: "Europa", icon: "🇪🇺" },
  { id: "america", name: "Américas", icon: "🌎" },
  { id: "asia", name: "Ásia", icon: "🌏" },
  { id: "africa", name: "África", icon: "🌍" },
  { id: "oceania", icon: "🇦🇺", name: "Oceania" },
  { id: "caribe", icon: "🏖️", name: "Caribe" },
];

const sizeFilters = ["P", "M", "G", "GG"];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; continent?: string; size?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const continent = params.continent || "todos";
  const sizeFilter = params.size || "";
  const take = 8;
  const skip = (page - 1) * take;

  const whereClause: Record<string, unknown> = {};
  
  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (continent !== "todos") {
    const continentMap: Record<string, string[]> = {
      europa: ["França", "Alemanha", "Portugal", "República Tcheca", "Croácia", "Bélgica", "Inglaterra"],
      america: ["Brasil", "Argentina", "México", "EUA", "Canadá", "Uruguai", "Paraguai", "Colômbia"],
      asia: ["Japão", "Coreia", "Irã"],
      oceania: ["Nova Zelândia"],
      africa: ["Marrocos", "África do Sul"],
      caribe: ["Haiti"],
    };
    const names = continentMap[continent] || [];
    if (names.length > 0) {
      whereClause.name = { contains: names[0], mode: "insensitive" };
    }
  }

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { created_at: "desc" },
    }),
    prisma.product.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return (
    <div>
      <Hero />
      
      <section id="catalogo" className="mx-auto px-4 lg:px-6 py-12 bg-black" style={{ maxWidth: '1200px' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Catálogo<span className="text-primary">.</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {totalCount} camisas disponíveis
            </p>
          </div>
          
          <form className="w-full md:w-auto relative" method="GET">
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Buscar seleções..." 
              className="w-full md:w-64 input-field text-sm pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {continents.map((c) => (
            <Link 
              key={c.id}
              href={`/?continent=${c.id}${search ? `&search=${search}` : ''}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                continent === c.id 
                  ? 'bg-primary text-white' 
                  : 'bg-black/60 text-gray-400 hover:bg-black/80'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </Link>
          ))}
          
          <div className="w-px bg-gray-700 mx-1" />
          
          {sizeFilters.map((s) => (
            <Link 
              key={s}
              href={`/?size=${s}${continent !== 'todos' ? `&continent=${continent}` : ''}${search ? `&search=${search}` : ''}`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                sizeFilter === s 
                  ? 'bg-primary text-white' 
                  : 'bg-black/60 text-gray-400 hover:bg-black/80'
              }`}
            >
              {s}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 glass-card p-8">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Nenhuma camisa encontrada</h3>
            <p className="text-gray-400 text-sm mb-6">Tente buscar por outro termo ou limpe os filtros.</p>
            <Link href="/" className="btn-primary inline-block text-sm">
              Limpar Busca
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 animate-slide-up">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group glass-card flex flex-col h-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-black/50 w-full">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="badge-primary text-[10px]">Novo</span>
                  </div>
                </div>
                <div className="p-3 lg:p-4 space-y-1.5 mt-auto bg-black/70">
                  <h3 className="font-semibold text-sm truncate text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {product.description.substring(0, 60)}...
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-primary font-bold text-base">
                      {(product.price_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <span className="text-primary text-xs font-medium group-hover:translate-x-1 transition-transform">
                      Ver mais →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {page > 1 && (
              <Link href={`/?page=${page - 1}${search ? `&search=${search}` : ''}${continent !== 'todos' ? `&continent=${continent}` : ''}`} className="btn-outline px-4 py-2 text-sm">
                Anterior
              </Link>
            )}
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link 
                key={i} 
                href={`/?page=${i + 1}${search ? `&search=${search}` : ''}${continent !== 'todos' ? `&continent=${continent}` : ''}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1 
                    ? 'bg-primary text-white' 
                    : 'border border-gray-700 hover:border-primary/50 text-gray-400'
                }`}
              >
                {i + 1}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={`/?page=${page + 1}${search ? `&search=${search}` : ''}${continent !== 'todos' ? `&continent=${continent}` : ''}`} className="btn-outline px-4 py-2 text-sm">
                Próxima
              </Link>
            )}
          </div>
        )}
      </section>

      <section id="destaques" className="mx-auto px-4 lg:px-6 py-12 bg-black/80" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Por que escolher World Cup Store?</h2>
          <p className="text-on-surface-variant text-sm">Qualidade premium para os verdadeiros torcedores</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center bg-black/70">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className="font-semibold text-white mb-2">100% Original</h3>
            <p className="text-gray-400 text-xs">Camisas oficiais com autenticidade garantida.</p>
          </div>
          <div className="glass-card p-6 text-center bg-black/70">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Tecido AeroFlow®</h3>
            <p className="text-gray-400 text-xs">Tecnologia de ventilação para máximo conforto.</p>
          </div>
          <div className="glass-card p-6 text-center bg-black/70">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <h3 className="font-semibold text-white mb-2">Entrega Rápida</h3>
            <p className="text-gray-400 text-xs">Frete grátis para todo o Brasil em compras acima de R$ 200.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
