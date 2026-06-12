import type { Metadata } from "next";
import { Oswald, Inter, Manrope } from "next/font/google";
import Image from "next/image";
import CartBadge from "@/components/CartBadge";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "World Cup Store - Camisas Premium de Seleções",
  description: "As melhores camisas de seleções nacionais para colecionadores e torcedores. Copa do Mundo 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
          <div className="mx-auto px-4 lg:px-6 h-16 flex items-center justify-between relative" style={{ maxWidth: '1200px' }}>
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-oswald)]">
                World Cup <span className="text-primary">Store</span>
              </span>
            </a>

            <div className="absolute left-1/2 -translate-x-1/2 top-1 flex items-center">
              <Image
                src="/wordcup.jpeg"
                alt="World Cup"
                width={80}
                height={80}
                className="rounded-full object-cover bg-transparent border-b-2 border-gray-400/50"
                priority
              />
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-[family-name:var(--font-manrope)]">
              <a href="/" className="text-gray-400 hover:text-primary transition-colors">
                Catálogo
              </a>
              <a href="/cart" className="text-gray-400 hover:text-primary transition-colors relative flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Carrinho
                <CartBadge />
              </a>
              <a href="/login" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Admin
              </a>
            </nav>

            <button className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>

        <footer className="py-12 border-t border-gray-800 mt-auto bg-black">
          <div className="mx-auto px-4 lg:px-6" style={{ maxWidth: '1200px' }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                  </div>
                  <span className="text-lg font-bold text-white font-[family-name:var(--font-oswald)]">World Cup <span className="text-primary">Store</span></span>
                </div>
                <p className="text-sm text-gray-400">Camisas premium de seleções nacionais para colecionadores exigentes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white mb-3 font-[family-name:var(--font-oswald)]">Navegação</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/" className="hover:text-primary transition-colors">Catálogo</a></li>
                  <li><a href="/cart" className="hover:text-primary transition-colors">Carrinho</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white mb-3 font-[family-name:var(--font-oswald)]">Contato</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>                  contato@worldcupstore.com.br</li>
                  <li>(16) 99738-3503</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white mb-3 font-[family-name:var(--font-oswald)]">Segurança</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Pagamento 100% seguro
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} World Cup Store. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
