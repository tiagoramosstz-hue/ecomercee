"use client";

import { useCartStore } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const customizationFee = items.reduce((acc, item) =>
    acc + ((item.customName || item.customNumber) ? 2000 * item.quantity : 0)
    , 0);

  const total = subtotal + customizationFee;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao iniciar checkout.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto px-4 lg:px-6 py-20 text-center animate-fade-in flex-1 flex flex-col justify-center items-center" style={{ maxWidth: '1200px' }}>
        <div className="w-20 h-20 mb-5 text-outline bg-surface-container rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-on-surface">Seu Carrinho está vazio</h1>
        <p className="text-on-surface-variant text-sm mb-6 max-w-md">
          Você ainda não escolheu nenhuma camisa. Navegue pelo nosso catálogo e encontre a peça ideal para sua coleção.
        </p>
        <Link href="/" className="btn-primary inline-block text-sm">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 lg:px-6 py-8 animate-fade-in" style={{ maxWidth: '1200px' }}>
      <h1 className="text-2xl lg:text-3xl font-bold mb-8 text-on-surface">
        Meu Carrinho<span className="text-primary">.</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center bg-white">
              <div className="relative w-24 h-24 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
               // Deixe assim:
                <Image
                  src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 space-y-1 text-center sm:text-left w-full">
                <h3 className="text-sm font-semibold text-on-surface">{item.name}</h3>
                <p className="text-xs text-on-surface-variant">
                  Tamanho: <span className="text-on-surface font-medium">{item.size}</span>
                </p>
                {(item.customName || item.customNumber) && (
                  <p className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    {item.customName} {item.customNumber} (+R$ 20,00)
                  </p>
                )}
                <div className="text-sm font-bold text-primary mt-1">
                  {((item.price) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2.5 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-sm cursor-pointer"
                  >-</button>
                  <span className="w-8 text-center text-sm font-medium text-on-surface">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-sm cursor-pointer"
                  >+</button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-error/70 hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
                  title="Remover item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="glass-card p-5 sticky top-24 bg-white border-t-2 border-t-primary">
            <h2 className="text-sm font-semibold mb-5 pb-3 border-b border-border text-on-surface">
              Resumo do Pedido
            </h2>
            <div className="space-y-3 mb-5 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} itens)</span>
                <span className="font-medium text-on-surface">{(subtotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              {customizationFee > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Personalização</span>
                  <span className="font-medium">+{(customizationFee / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Frete</span>
                <span className="font-medium text-primary">Grátis</span>
              </div>
            </div>
            <div className="border-t border-border pt-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm text-on-surface">Total</span>
                <span className="text-xl font-bold text-primary">
                  {(total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${loading
                  ? 'bg-surface-container-high text-outline cursor-wait'
                  : 'btn-primary'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                  Processando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  Finalizar Compra
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                SSL Seguro
              </span>
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Compra Protegida
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
