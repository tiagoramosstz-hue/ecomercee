import { prisma } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartForm from "./AddToCartForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      inventory: true
    }
  });

  if (!product) {
    notFound();
  }

  const sizesAvailable = product.inventory.reduce((acc, curr) => {
    acc[curr.size] = curr.quantity;
    return acc;
  }, {} as Record<string, number>);

  const specs = [
    { label: "Tecnologia", value: "AeroFlow®", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { label: "Material", value: "100% Poliéster", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
    { label: "Caimento", value: "Regular Fit", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label: "Gola", value: "Redonda", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" },
  ];

  return (
    <div className="mx-auto px-4 lg:px-6 py-8" style={{ maxWidth: '1200px' }}>
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
        <a href="/" className="hover:text-primary transition-colors">Catálogo</a>
        <span>/</span>
        <span className="text-on-surface font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2 w-full animate-fade-in">
          <div className="relative aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden glass-card">
            <Image 
              src={product.image_url} 
              alt={product.name} 
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="badge-primary">Novo</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full flex flex-col justify-center animate-slide-up">
          <div className="mb-4">
            <span className="badge-success text-xs mb-2">Em estoque</span>
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-on-surface">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl text-primary font-bold">
              {(product.price_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <span className="text-on-surface-variant text-sm line-through">
              {((product.price_cents * 1.3) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="badge-primary text-[10px]">-30%</span>
          </div>
          
          <div className="mb-6 text-on-surface-variant leading-relaxed text-sm">
            {product.description}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={spec.icon}></path></svg>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{spec.label}</p>
                  <p className="text-xs font-semibold text-on-surface">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <AddToCartForm product={product} sizesAvailable={sizesAvailable} />
        </div>
      </div>
    </div>
  );
}
