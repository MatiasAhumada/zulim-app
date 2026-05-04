"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { UI_TEXT } from "@/constants/ui-text.constant";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "seller";
  createdAt: Date;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@zulim.com",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Juan Vendedor",
    email: "juan@zulim.com",
    role: "seller",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "María Vendedora",
    email: "maria@zulim.com",
    role: "seller",
    createdAt: new Date(),
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.includes(searchQuery),
  );

  const columns = [
    { key: "name", label: UI_TEXT.TABLE.COLUMNS.NAME },
    { key: "email", label: UI_TEXT.TABLE.COLUMNS.EMAIL },
    {
      key: "role",
      label: UI_TEXT.TABLE.COLUMNS.ROLE,
      render: (u: User) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${u.role === "admin" ? "bg-[#532b88] text-white" : "bg-[#f4effa] text-[#532b88]"}`}
        >
          {u.role === "admin" ? UI_TEXT.ROLES.ADMIN : UI_TEXT.ROLES.SELLER}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: UI_TEXT.TABLE.COLUMNS.CREATED,
      render: (u: User) => u.createdAt.toLocaleDateString("es-AR"),
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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#2f184b]">
            {UI_TEXT.PAGES.USERS.TITLE}
          </h1>
          <p className="text-[#4a4451] mt-2">{UI_TEXT.PAGES.USERS.SUBTITLE}</p>
        </div>
        <Button className="bg-gradient-to-r from-[#532b88] to-[#724aa4] hover:from-[#3c0e71] hover:to-[#532b88] text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]">
          + {UI_TEXT.PAGES.USERS.NEW_BUTTON}
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
          data={filteredUsers}
          keyExtractor={(u) => u.id}
          searchPlaceholder={UI_TEXT.PAGES.USERS.SEARCH_PLACEHOLDER}
          onSearch={setSearchQuery}
          emptyMessage={UI_TEXT.PAGES.USERS.EMPTY_MESSAGE}
        />
      </motion.div>
    </motion.div>
  );
}
