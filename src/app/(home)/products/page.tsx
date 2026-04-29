"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/currency.util";
import {
  PackageIcon,
  AlertCircleIcon,
  DollarCircleIcon,
  Download01Icon,
  Upload01Icon,
  PlusSignIcon,
} from "hugeicons-react";

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
    description: "Carne molida de primera",
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Azúcar",
    sku: "AZU-001",
    unitType: "KG",
    stock: 200,
    salePrice: 380,
    purchasePrice: 250,
    profitMargin: 34,
    retailPrice: 380,
    wholesalePrice: 320,
    minSaleQuantity: 1,
    maxSaleQuantity: null,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Fideos",
    sku: "FID-001",
    unitType: "UNIT",
    stock: 150,
    salePrice: 290,
    purchasePrice: 200,
    profitMargin: 31,
    retailPrice: 290,
    wholesalePrice: 250,
    minSaleQuantity: 1,
    maxSaleQuantity: null,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products] = useState(mockProducts);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock < 20).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce(
    (sum, p) => sum + p.purchasePrice * p.stock,
    0,
  );

  const columns = [
    { key: "sku", label: "SKU", className: "w-24" },
    { key: "name", label: "PRODUCTO" },
    {
      key: "unitType",
      label: "UNIDAD",
      render: (p: Product) => (
        <span className="px-2 py-1 bg-[#f4effa] text-[#532b88] rounded text-xs font-semibold uppercase tracking-wider">
          {p.unitType}
        </span>
      ),
    },
    {
      key: "stock",
      label: "STOCK",
      render: (p: Product) => (
        <span
          className={
            p.stock < 20
              ? "text-red-600 font-bold"
              : "text-[#2f184b] font-semibold"
          }
        >
          {p.stock} {p.unitType}
        </span>
      ),
    },
    {
      key: "purchasePrice",
      label: "COSTO",
      render: (p: Product) => (
        <span className="text-[#4a4451]">
          {formatCurrency(p.purchasePrice)}
        </span>
      ),
    },
    {
      key: "salePrice",
      label: "VENTA",
      render: (p: Product) => (
        <span className="font-bold text-[#532b88]">
          {formatCurrency(p.salePrice)}
        </span>
      ),
    },
    {
      key: "profitMargin",
      label: "MARGEN",
      render: (p: Product) => (
        <span
          className={
            p.profitMargin >= 30
              ? "text-green-600 font-semibold"
              : "text-[#4a4451]"
          }
        >
          {p.profitMargin}%
        </span>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#2f184b] tracking-tight">
            Productos e Inventario
          </h1>
          <p className="text-[#4a4451] text-sm mt-1">
            Gestión del catálogo y control de stock
          </p>
        </div>
        <Button className="bg-[#532b88] hover:bg-[#9b72cf] text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <PlusSignIcon size={16} strokeWidth={2} />
          Nuevo Producto
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-3"
      >
        <Card className="border border-[#c8b1e4] rounded-lg">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3b82f615] flex items-center justify-center">
              <PackageIcon
                size={20}
                style={{ color: "#3b82f6" }}
                strokeWidth={2}
              />
            </div>
            <div>
              <p className="text-xs text-[#4a4451] font-semibold uppercase tracking-wider">
                Total
              </p>
              <p className="text-2xl font-bold text-[#2f184b]">
                {totalProducts}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#fde68a] rounded-lg bg-[#fffbeb]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f59e0b15] flex items-center justify-center">
              <AlertCircleIcon
                size={20}
                style={{ color: "#f59e0b" }}
                strokeWidth={2}
              />
            </div>
            <div>
              <p className="text-xs text-[#92400e] font-semibold uppercase tracking-wider">
                Stock Bajo
              </p>
              <p className="text-2xl font-bold text-[#92400e]">{lowStock}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#fca5a5] rounded-lg bg-[#fef2f2]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef444415] flex items-center justify-center">
              <AlertCircleIcon
                size={20}
                style={{ color: "#ef4444" }}
                strokeWidth={2}
              />
            </div>
            <div>
              <p className="text-xs text-[#991b1b] font-semibold uppercase tracking-wider">
                Sin Stock
              </p>
              <p className="text-2xl font-bold text-[#991b1b]">{outOfStock}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#c8b1e4] rounded-lg bg-[#f4effa]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#532b8815] flex items-center justify-center">
              <DollarCircleIcon
                size={20}
                style={{ color: "#532b88" }}
                strokeWidth={2}
              />
            </div>
            <div>
              <p className="text-xs text-[#4a4451] font-semibold uppercase tracking-wider">
                Valor Total
              </p>
              <p className="text-2xl font-bold text-[#532b88]">
                {formatCurrency(totalValue)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          title=""
          subtitle=""
          columns={columns}
          data={filteredProducts}
          keyExtractor={(p) => p.id}
          searchPlaceholder="Buscar por nombre o SKU..."
          onSearch={setSearchQuery}
          emptyMessage="No hay productos registrados"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2"
      >
        <Button
          variant="outline"
          className="border border-[#c8b1e4] text-[#2f184b] hover:bg-[#f4effa] hover:border-[#532b88] rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Download01Icon size={16} strokeWidth={2} />
          Importar Excel
        </Button>
        <Button
          variant="outline"
          className="border border-[#c8b1e4] text-[#2f184b] hover:bg-[#f4effa] hover:border-[#532b88] rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Upload01Icon size={16} strokeWidth={2} />
          Exportar Excel
        </Button>
      </motion.div>
    </motion.div>
  );
}
