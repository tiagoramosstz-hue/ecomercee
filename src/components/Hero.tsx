import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[63vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="/capaheader1.jpeg"
          alt="World Cup Store Background"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative mx-auto px-4 lg:px-6 py-16 lg:py-24" style={{ maxWidth: '1200px' }}>
        <div className="flex flex-col text-center lg:text-left animate-fade-in">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-medium font-[family-name:var(--font-inter)]">Copa do Mundo 2026</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 font-[family-name:var(--font-oswald)]">
              Vista a camisa da sua
              <span className="block text-secondary">seleção favorita</span>
            </h1>

            <p className="text-white/80 text-sm lg:text-base mb-8 max-w-lg mx-auto lg:mx-0 font-[family-name:var(--font-inter)]">
              Camisas oficiais e premium das melhores seleções do mundo.
              Tecido AeroFlow®, acabamento premium e diseño autêntico.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="#catalogo" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg font-[family-name:var(--font-manrope)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Explorar Catálogo
              </Link>
              <a href="#destaques" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition-all font-[family-name:var(--font-manrope)]">
                Ver Destaques
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start font-[family-name:var(--font-inter)]">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">11+</p>
                <p className="text-white/60 text-xs">Seleções</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-white/60 text-xs">Original</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">AeroFlow®</p>
                <p className="text-white/60 text-xs">Tecnologia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
