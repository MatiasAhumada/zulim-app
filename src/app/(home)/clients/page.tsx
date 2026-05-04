"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { UI_TEXT } from "@/constants/ui-text.constant";

interface Client {
  id: string;
  name: string;
  taxId: string;
  taxCondition: string;
  address?: string;
  email?: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Juan Pérez",
    taxId: "20-12345678-9",
    taxCondition: "Responsable Inscripto",
    address: "Calle 123",
    email: "juan@test.com",
  },
  {
    id: "2",
    name: "María González",
    taxId: "27-87654321-0",
    taxCondition: "Monotributo",
    address: "Av. Principal 456",
    email: "maria@test.com",
  },
  {
    id: "3",
    name: "Supermercado Norte",
    taxId: "30-11111111-1",
    taxCondition: "Responsable Inscripto",
    address: "Ruta 5 KM 10",
    email: "norte@test.com",
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.taxId.includes(searchQuery),
  );

  const columns = [
    { key: "name", label: UI_TEXT.TABLE.COLUMNS.CLIENT },
    { key: "taxId", label: UI_TEXT.TABLE.COLUMNS.CUIT },
    {
      key: "taxCondition",
      label: UI_TEXT.TABLE.COLUMNS.CONDITION,
      render: (c: Client) => (
        <span className="px-2 py-1 bg-[#f4effa] text-[#532b88] rounded text-xs font-medium">
          {c.taxCondition}
        </span>
      ),
    },
    { key: "email", label: UI_TEXT.TABLE.COLUMNS.EMAIL },
    { key: "address", label: UI_TEXT.TABLE.COLUMNS.ADDRESS },
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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#2f184b]">
            {UI_TEXT.PAGES.CLIENTS.TITLE}
          </h1>
          <p className="text-[#4a4451] mt-2">
            {UI_TEXT.PAGES.CLIENTS.SUBTITLE}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#532b88] to-[#724aa4] hover:from-[#3c0e71] hover:to-[#532b88] text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]">
          + {UI_TEXT.PAGES.CLIENTS.NEW_BUTTON}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          title=""
          subtitle=""
          columns={columns}
          data={filteredClients}
          keyExtractor={(c) => c.id}
          searchPlaceholder={UI_TEXT.PAGES.CLIENTS.SEARCH_PLACEHOLDER}
          onSearch={setSearchQuery}
          emptyMessage={UI_TEXT.PAGES.CLIENTS.EMPTY_MESSAGE}
        />
      </motion.div>
    </motion.div>
  );
}
