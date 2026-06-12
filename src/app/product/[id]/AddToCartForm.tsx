"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import type { Product, Size } from "@prisma/client";

export default function AddToCartForm({
  product,
  sizesAvailable
}: {
  product: Product;
  sizesAvailable: Record<string, number>;
}) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [added, setAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addItem({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.price_cents,
      image: product.image_url,
      size: selectedSize,
      quantity: 1,
      customName: customName || undefined,
      customNumber: customNumber || undefined,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5 p-5 bg-surface-container-low rounded-xl border border-border">
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center justify-between text-on-surface">
          <span>Tamanho <span className="text-error">*</span></span>
          <span className="text-xs font-normal text-on-surface-variant">Guia de tamanhos</span>
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {(['P', 'M', 'G', 'GG'] as Size[]).map((size) => {
            const available = sizesAvailable[size] > 0;
            return (
              <button
                key={size}
                disabled={!available}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                  selectedSize === size 
                    ? 'border-primary bg-primary text-white shadow-md' 
                    : available 
                      ? 'border-border bg-white hover:border-primary/50 text-on-surface' 
                      : 'border-border-subtle text-outline bg-surface-container cursor-not-allowed opacity-50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold mb-3 text-on-surface">
          Personalização <span className="text-xs font-normal text-on-surface-variant">(Opcional + R$ 20,00)</span>
        </h3>
        <div className="space-y-3">
          <div>
            <label className="label-field">Nome na Camisa</label>
            <input 
              type="text" 
              maxLength={15}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Ex: RONALDINHO" 
              className="input-field text-sm uppercase"
            />
          </div>
          <div>
            <label className="label-field">Número (0 a 99)</label>
            <input 
              type="text" 
              maxLength={2}
              value={customNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setCustomNumber(val);
              }}
              placeholder="Ex: 10" 
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      <button
        disabled={!selectedSize}
        onClick={handleAddToCart}
        className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
          !selectedSize 
            ? 'bg-surface-container-high border border-border text-outline cursor-not-allowed' 
            : added
              ? 'bg-green-500 text-white'
              : 'btn-primary'
        }`}
      >
        {added ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Adicionado!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Adicionar ao Carrinho
          </>
        )}
      </button>
    </div>
  );
}
