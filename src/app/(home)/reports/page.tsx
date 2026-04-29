"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "📊 Ventas por Período",
    description: "Resumen de ventas diarias, semanales y mensuales",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "📈 Evolución de Precios",
    description: "Historial de cambios de precio y métricas de inflación",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "💰 Márgenes de Ganancia",
    description: "Análisis de márgenes por producto y categoría",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "📦 Stock y Rotación",
    description: "Productos con mayor rotación y alertas de stock",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "👥 Clientes AFIP",
    description: "Clientes por condición fiscal y facturación",
    color: "from-cyan-500 to-sky-600",
  },
  {
    title: "📋 Arqueo de Caja",
    description: "Resumen diario de ventas y métodos de pago",
    color: "from-rose-500 to-red-600",
  },
];

export default function ReportsPage() {
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
        <h1 className="text-4xl font-bold text-[#2f184b]">Reportes</h1>
        <p className="text-[#4a4451] mt-2">Análisis y métricas del negocio</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="border-2 border-[#c8b1e4] hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${report.color.split(" ")[1]} 0%, ${report.color.split(" ")[3]} 100%)`,
                }}
              />
              <CardHeader className="relative z-10">
                <CardTitle className="text-[#2f184b] text-xl group-hover:text-[#532b88] transition-colors">
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-[#4a4451]">{report.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
