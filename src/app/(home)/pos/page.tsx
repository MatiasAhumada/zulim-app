"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductSearch } from "@/components/pos/ProductSearch";
import { POSCart } from "@/components/pos/POSCart";
import { RoundedTotal } from "@/components/pos/RoundedTotal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product.types";
import { useReducedMotion } from "framer-motion";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function POSPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const handleSelectProduct = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId),
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const handleRemove = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-[#2f184b]">Punto de Venta</h1>
        <p className="text-[#4a4451] mt-2">
          Venta rápida con redondeo a centena
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="border-2 border-[#c8b1e4] shadow-xl hover:shadow-2xl transition-shadow">
            <div className="p-6 border-b border-[#c8b1e4]/30 bg-gradient-to-r from-[#f4effa] via-white to-[#f4effa]">
              <h2 className="font-bold text-[#2f184b] text-xl flex items-center gap-2">
                🔍 Buscar Producto
              </h2>
            </div>
            <div className="p-6">
              <ProductSearch onSelectProduct={handleSelectProduct} />
            </div>
          </Card>

          <Card className="border-2 border-[#c8b1e4] shadow-xl hover:shadow-2xl transition-shadow">
            <div className="p-6 border-b border-[#c8b1e4]/30 bg-gradient-to-r from-[#f4effa] via-white to-[#f4effa] flex items-center justify-between">
              <h2 className="font-bold text-[#2f184b] text-xl flex items-center gap-2">
                🛒 Carrito de Compras
              </h2>
              <span className="px-4 py-2 bg-gradient-to-r from-[#532b88] to-[#724aa4] text-white text-sm rounded-full font-bold shadow-lg shadow-purple-500/30">
                {cartItems.length} items
              </span>
            </div>
            <div className="p-6">
              <POSCart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-2 border-[#c8b1e4] shadow-xl sticky top-24">
            <div className="p-6 border-b border-[#c8b1e4]/30 bg-gradient-to-r from-[#532b88] via-[#724aa4] to-[#532b88]">
              <h2 className="font-bold text-white text-xl flex items-center gap-2">
                💵 Resumen de Venta
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <RoundedTotal subtotal={subtotal} />

              <Button
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-[#532b88] to-[#724aa4] hover:from-[#3c0e71] hover:to-[#532b88] shadow-xl shadow-purple-500/40 transition-all hover:scale-[1.02]"
                disabled={cartItems.length === 0}
              >
                💳 Cobrar Venta
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 border-2 border-[#c8b1e4] text-[#2f184b] hover:bg-[#f4effa] hover:border-[#9b72cf] transition-all"
                onClick={() => setCartItems([])}
                disabled={cartItems.length === 0}
              >
                🗑️ Vaciar Carrito
              </Button>
            </div>
          </Card>

          <Card className="border-2 border-[#c8b1e4] shadow-xl">
            <div className="p-4 bg-gradient-to-r from-[#f4effa] to-white border-b border-[#c8b1e4]/30">
              <h3 className="font-bold text-[#2f184b] flex items-center gap-2">
                ⌨️ Atajos de Teclado
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm text-[#4a4451]">
              <div className="flex justify-between items-center">
                <span>Buscar producto</span>
                <kbd className="px-3 py-1.5 bg-[#f4effa] border border-[#c8b1e4] rounded text-xs font-mono">
                  Ctrl+B
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Seleccionar</span>
                <kbd className="px-3 py-1.5 bg-[#f4effa] border border-[#c8b1e4] rounded text-xs font-mono">
                  Enter
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Cancelar</span>
                <kbd className="px-3 py-1.5 bg-[#f4effa] border border-[#c8b1e4] rounded text-xs font-mono">
                  Esc
                </kbd>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
