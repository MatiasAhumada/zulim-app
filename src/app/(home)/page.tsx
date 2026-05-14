"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { UI_TEXT } from "@/constants/ui-text.constant";
import {
  DollarCircleIcon,
  PackageIcon,
  UserMultiple02Icon,
  AlertCircleIcon,
  ShoppingCart01Icon,
  ChartLineData01Icon,
  Database02Icon,
  Tick02Icon,
  Loading03Icon,
} from "hugeicons-react";

const stats = [
  {
    label: UI_TEXT.STATS.SALES_TODAY,
    value: "$0",
    subtitle: UI_TEXT.STATS.NO_SALES,
    icon: DollarCircleIcon,
    iconColor: "#10b981",
  },
  {
    label: UI_TEXT.STATS.PRODUCTS,
    value: "5",
    subtitle: UI_TEXT.STATS.IN_CATALOG,
    icon: PackageIcon,
    iconColor: "#3b82f6",
  },
  {
    label: UI_TEXT.STATS.CLIENTS,
    value: "3",
    subtitle: UI_TEXT.STATS.REGISTERED,
    icon: UserMultiple02Icon,
    iconColor: "#06b6d4",
  },
  {
    label: UI_TEXT.STATS.LOW_STOCK,
    value: "2",
    subtitle: UI_TEXT.STATS.LOW_STOCK_COUNT,
    icon: AlertCircleIcon,
    iconColor: "#f59e0b",
  },
];

const quickActions = [
  {
    label: UI_TEXT.QUICK_ACTIONS.NEW_SALE,
    href: ROUTES.POS,
    icon: ShoppingCart01Icon,
    iconColor: "#532b88",
  },
  {
    label: UI_TEXT.QUICK_ACTIONS.PRODUCTS,
    href: ROUTES.PRODUCTS,
    icon: PackageIcon,
    iconColor: "#532b88",
  },
  {
    label: UI_TEXT.QUICK_ACTIONS.REPORTS,
    href: ROUTES.REPORTS,
    icon: ChartLineData01Icon,
    iconColor: "#532b88",
  },
  {
    label: UI_TEXT.QUICK_ACTIONS.CLIENTS,
    href: ROUTES.CLIENTS,
    icon: UserMultiple02Icon,
    iconColor: "#532b88",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return UI_TEXT.GREETINGS.MORNING;
    if (hour < 18) return UI_TEXT.GREETINGS.AFTERNOON;
    return UI_TEXT.GREETINGS.EVENING;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <p className="text-[#9b72cf] font-semibold text-sm mb-1 tracking-wide">
            {getGreeting()},
          </p>
          <h1 className="text-4xl font-bold text-[#2f184b] tracking-tight">
            {user?.name || "Usuario"}
          </h1>
          <p className="text-[#4a4451] text-sm mt-1">
            {UI_TEXT.PAGES.DASHBOARD.WELCOME}
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[#4a4451] text-xs font-medium uppercase tracking-wide">
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + index * 0.02 }}
              className="bg-white border border-[#c8b1e4] rounded-lg p-4 hover:border-[#9b72cf] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[#4a4451] text-xs font-semibold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-[#2f184b] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[#4a4451] text-xs">{stat.subtitle}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.iconColor}15` }}
                >
                  <IconComponent
                    size={24}
                    style={{ color: stat.iconColor, stroke: stat.iconColor }}
                    strokeWidth={2}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-sm font-semibold text-[#2f184b] mb-3 uppercase tracking-wider">
          {UI_TEXT.QUICK_ACTIONS.TITLE}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.02 }}
              >
                <Link
                  href={action.href}
                  className="group bg-white border border-[#c8b1e4] rounded-lg p-4 hover:border-[#532b88] hover:bg-[#f4effa] transition-all block"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#f4effa] flex items-center justify-center group-hover:bg-[#532b88] transition-colors">
                      <IconComponent
                        size={20}
                        className="text-[#532b88] group-hover:text-white transition-colors"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#2f184b]">
                      {action.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="bg-white border border-[#c8b1e4] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#c8b1e4] bg-[#f4effa] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#2f184b] uppercase tracking-wider flex items-center gap-2">
              <ShoppingCart01Icon
                size={16}
                className="text-[#532b88]"
                strokeWidth={2}
              />
              {UI_TEXT.PAGES.SALES.RECENT_SALES}
            </h3>
            <Link
              href={ROUTES.SALES}
              className="text-xs text-[#532b88] hover:text-[#9b72cf] font-semibold uppercase tracking-wider transition-colors"
            >
              {UI_TEXT.PAGES.SALES.VIEW_ALL} →
            </Link>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <ChartLineData01Icon
                size={48}
                className="mx-auto mb-3 text-[#c8b1e4]"
                strokeWidth={1.5}
              />
              <p className="text-[#4a4451] text-sm font-medium">
                {UI_TEXT.PAGES.SALES.NO_SALES_TODAY}
              </p>
              <Link
                href={ROUTES.POS}
                className="inline-block mt-3 px-4 py-2 bg-[#532b88] hover:bg-[#9b72cf] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {UI_TEXT.PAGES.SALES.FIRST_SALE_BUTTON}
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#c8b1e4] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#c8b1e4] bg-[#f4effa]">
            <h3 className="text-sm font-semibold text-[#2f184b] uppercase tracking-wider flex items-center gap-2">
              <Database02Icon
                size={16}
                className="text-[#532b88]"
                strokeWidth={2}
              />
              {UI_TEXT.SYSTEM_STATUS.TITLE}
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between p-3 bg-[#f0fdf4] border border-[#86efac] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                  <Tick02Icon
                    size={14}
                    className="text-white"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-[#166534] text-sm font-semibold">
                  {UI_TEXT.SYSTEM_STATUS.DATABASE}
                </span>
              </div>
              <span className="text-[#166534] text-xs font-semibold px-2 py-1 bg-[#dcfce7] rounded">
                {UI_TEXT.SYSTEM_STATUS.CONNECTED}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#f0fdf4] border border-[#86efac] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
                  <Tick02Icon
                    size={14}
                    className="text-white"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-[#166534] text-sm font-semibold">
                  {UI_TEXT.SYSTEM_STATUS.AFIP}
                </span>
              </div>
              <span className="text-[#166534] text-xs font-semibold px-2 py-1 bg-[#dcfce7] rounded">
                {UI_TEXT.SYSTEM_STATUS.ACTIVE}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#fffbeb] border border-[#fde68a] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center">
                  <Loading03Icon
                    size={14}
                    className="text-white"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-[#92400e] text-sm font-semibold">
                  {UI_TEXT.SYSTEM_STATUS.SYNC}
                </span>
              </div>
              <span className="text-[#92400e] text-xs font-semibold px-2 py-1 bg-[#fef3c7] rounded">
                {UI_TEXT.SYSTEM_STATUS.PENDING}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
