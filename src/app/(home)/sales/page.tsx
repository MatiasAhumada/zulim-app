"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { formatCurrency } from "@/utils/currency.util";
import { UI_TEXT } from "@/constants/ui-text.constant";

interface Sale {
  id: string;
  createdAt: Date;
  totalAmount: number;
  roundedAmount: number;
  paymentMethod: string;
  invoiceType: string | null;
  clientName?: string;
}

const mockSales: Sale[] = [
  {
    id: "1",
    createdAt: new Date(),
    totalAmount: 2450,
    roundedAmount: 2500,
    paymentMethod: "Efectivo",
    invoiceType: "Ticket",
    clientName: "Consumidor Final",
  },
  {
    id: "2",
    createdAt: new Date(),
    totalAmount: 8900,
    roundedAmount: 8900,
    paymentMethod: "Transferencia",
    invoiceType: "B",
    clientName: "Juan Pérez",
  },
  {
    id: "3",
    createdAt: new Date(),
    totalAmount: 1230,
    roundedAmount: 1300,
    paymentMethod: "Efectivo",
    invoiceType: "Ticket",
    clientName: "Consumidor Final",
  },
];

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSales = mockSales.filter(
    (s) =>
      s.id.includes(searchQuery) ||
      s.clientName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalVentas = mockSales.reduce((sum, s) => sum + s.roundedAmount, 0);

  const columns = [
    { key: "id", label: UI_TEXT.TABLE.COLUMNS.ID },
    {
      key: "createdAt",
      label: UI_TEXT.TABLE.COLUMNS.DATE,
      render: (s: Sale) => s.createdAt.toLocaleDateString("es-AR"),
    },
    { key: "clientName", label: UI_TEXT.TABLE.COLUMNS.CLIENT },
    { key: "paymentMethod", label: UI_TEXT.TABLE.COLUMNS.METHOD },
    {
      key: "totalAmount",
      label: UI_TEXT.TABLE.COLUMNS.SUBTOTAL,
      render: (s: Sale) => formatCurrency(s.totalAmount),
    },
    {
      key: "roundedAmount",
      label: UI_TEXT.TABLE.COLUMNS.TOTAL,
      render: (s: Sale) => (
        <span className="font-bold text-[#532b88]">
          {formatCurrency(s.roundedAmount)}
        </span>
      ),
    },
    {
      key: "invoiceType",
      label: UI_TEXT.TABLE.COLUMNS.TYPE,
      render: (s: Sale) =>
        s.invoiceType ? (
          <span className="px-2 py-1 bg-[#f4effa] text-[#532b88] rounded text-xs">
            {s.invoiceType}
          </span>
        ) : (
          "-"
        ),
    },
  ];

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
        <h1 className="text-4xl font-bold text-[#2f184b]">
          {UI_TEXT.PAGES.SALES.TITLE}
        </h1>
        <p className="text-[#4a4451] mt-2">{UI_TEXT.PAGES.SALES.SUBTITLE}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border-2 border-[#c8b1e4] shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-[#f4effa] to-white">
          <CardContent className="p-6">
            <p className="text-sm text-[#4a4451] mb-2">
              {UI_TEXT.STATS.SALES_TODAY_CARD}
            </p>
            <p className="text-3xl font-bold text-[#532b88]">
              {mockSales.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#c8b1e4] shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-white">
          <CardContent className="p-6">
            <p className="text-sm text-emerald-700 mb-2">
              {UI_TEXT.STATS.TOTAL_DAY}
            </p>
            <p className="text-3xl font-bold text-emerald-600">
              {formatCurrency(totalVentas)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#c8b1e4] shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <p className="text-sm text-blue-700 mb-2">
              {UI_TEXT.STATS.AVERAGE_TICKET}
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(totalVentas / mockSales.length)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          title=""
          subtitle=""
          columns={columns}
          data={filteredSales}
          keyExtractor={(s) => s.id}
          searchPlaceholder={UI_TEXT.PAGES.SALES.SEARCH_PLACEHOLDER}
          onSearch={setSearchQuery}
          emptyMessage={UI_TEXT.PAGES.SALES.EMPTY_MESSAGE}
        />
      </motion.div>
    </motion.div>
  );
}
