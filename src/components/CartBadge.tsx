"use client";

import { useCartStore } from "@/lib/cart";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
      {totalItems}
    </span>
  );
}
