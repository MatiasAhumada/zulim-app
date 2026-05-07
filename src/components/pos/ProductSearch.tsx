"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/currency.util";
import { UI_TEXT } from "@/constants/ui-text.constant";

interface ProductSearchProps {
  onSelectProduct: (product: Product) => void;
}

export function ProductSearch({ onSelectProduct }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Carne Molida",
      sku: "CAR-001",
      unitType: "KG",
      stock: 50,
      salePrice: 2500,
      purchasePrice: 1800,
      profitMargin: 28,
      retailPrice: 2500,
      wholesalePrice: 2200,
      minSaleQuantity: 1,
      maxSaleQuantity: null,
      description: null,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Pollo Entero",
      sku: "POL-001",
      unitType: "KG",
      stock: 30,
      salePrice: 1200,
      purchasePrice: 900,
      profitMargin: 25,
      retailPrice: 1200,
      wholesalePrice: 1050,
      minSaleQuantity: 1,
      maxSaleQuantity: null,
      description: null,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Harina de Trigo",
      sku: "HAR-001",
      unitType: "KG",
      stock: 100,
      salePrice: 450,
      purchasePrice: 300,
      profitMargin: 33,
      retailPrice: 450,
      wholesalePrice: 380,
      minSaleQuantity: 1,
      maxSaleQuantity: null,
      description: null,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const filtered = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setResults(filtered);
    setIsOpen(true);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        onSelectProduct(results[selectedIndex]);
        setQuery("");
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onSelectProduct]);

  return (
    <div className="relative w-full">
      <Input
        placeholder={UI_TEXT.POS_COMPONENTS.SEARCH.PLACEHOLDER}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 text-base bg-white border-2 border-[#c8b1e4] focus:border-[#532b88] focus:ring-2 focus:ring-[#532b88]/20 rounded-lg"
      />
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-[#c8b1e4] rounded-lg shadow-xl max-h-64 overflow-y-auto"
          >
            {results.map((product, index) => (
              <li
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  setQuery("");
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? "bg-[#f4effa]"
                    : "hover:bg-[#f4effa]"
                }`}
              >
                <div>
                  <p className="font-medium text-[#2f184b]">{product.name}</p>
                  <p className="text-sm text-[#4a4451]">
                    {UI_TEXT.POS_COMPONENTS.SEARCH.SKU_LABEL} {product.sku}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#532b88]">
                    {formatCurrency(product.salePrice)}
                  </p>
                  <p className="text-xs text-[#4a4451]">
                    {UI_TEXT.POS_COMPONENTS.SEARCH.STOCK_LABEL} {product.stock}{" "}
                    {product.unitType}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
