"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/currency.util";

interface CartItem {
  product: Product;
  quantity: number;
}

interface POSCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function POSCart({ items, onUpdateQuantity, onRemove }: POSCartProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-[#f4effa] flex items-center justify-center">
          <span className="text-3xl">🛒</span>
        </div>
        <p className="text-[#4a4451]">Carrito vacío</p>
        <p className="text-sm text-[#4a4451]/60 mt-1">
          Buscar productos para agregar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#c8b1e4]/50"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[#2f184b] truncate">
              {item.product.name}
            </p>
            <p className="text-sm text-[#4a4451]">
              {formatCurrency(item.product.salePrice)} / {item.product.unitType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity - 1)
              }
              className="w-8 h-8 rounded-lg bg-[#f4effa] text-[#532b88] font-bold hover:bg-[#e8d1ff] transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center font-medium text-[#2f184b]">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity + 1)
              }
              className="w-8 h-8 rounded-lg bg-[#532b88] text-white font-bold hover:bg-[#3c0e71] transition-colors"
            >
              +
            </button>
          </div>
          <div className="text-right min-w-[80px]">
            <p className="font-bold text-[#532b88]">
              {formatCurrency(item.product.salePrice * item.quantity)}
            </p>
            <button
              onClick={() => onRemove(item.product.id)}
              className="text-xs text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
