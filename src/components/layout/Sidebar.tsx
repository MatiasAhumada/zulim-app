"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  Home01Icon,
  ShoppingCart01Icon,
  PackageIcon,
  DollarCircleIcon,
  UserMultiple02Icon,
  ChartLineData01Icon,
  UserIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Logout03Icon,
} from "hugeicons-react";

type UserRole = "admin" | "seller";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home01Icon,
    gradient: "from-violet-500 to-purple-600",
    roles: ["admin", "seller"],
  },
  {
    label: "Punto de Venta",
    href: "/pos",
    icon: ShoppingCart01Icon,
    gradient: "from-fuchsia-500 to-pink-600",
    roles: ["admin", "seller"],
  },
  {
    label: "Productos",
    href: "/products",
    icon: PackageIcon,
    gradient: "from-indigo-500 to-blue-600",
    roles: ["admin"],
  },
  {
    label: "Ventas",
    href: "/sales",
    icon: DollarCircleIcon,
    gradient: "from-emerald-500 to-teal-600",
    roles: ["admin", "seller"],
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: UserMultiple02Icon,
    gradient: "from-cyan-500 to-sky-600",
    roles: ["admin"],
  },
  {
    label: "Reportes",
    href: "/reports",
    icon: ChartLineData01Icon,
    gradient: "from-rose-500 to-red-600",
    roles: ["admin"],
  },
  {
    label: "Usuarios",
    href: "/users",
    icon: UserIcon,
    gradient: "from-slate-500 to-zinc-600",
    roles: ["admin"],
  },
];

interface SidebarProps {
  role?: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  role = "seller",
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { user, logout } = useAuth();
  const router = useRouter();

  const filteredItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "96px" },
  };

  return (
    <motion.aside
      variants={shouldReduceMotion ? undefined : sidebarVariants}
      initial="collapsed"
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col"
      style={{
        background: "linear-gradient(180deg, #2f184b 0%, #1a0f2e 100%)",
        boxShadow: "4px 0 24px rgba(83, 43, 136, 0.3)",
      }}
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-2">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <div>
                  <span className="font-bold text-white text-lg tracking-wide">
                    ZULIM
                  </span>
                  <p className="text-xs text-purple-300">Sistema ERP</p>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={onToggle}
                className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-lg shadow-purple-500/30 hover:opacity-90 transition-all"
              >
                <span className="text-white font-bold text-xl">Z</span>
              </button>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white transition-all"
            >
              <ArrowLeft01Icon size={20} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
        {filteredItems.map((item, index) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-[#532b88]/80 to-[#724aa4]/80 text-white shadow-lg shadow-purple-500/20"
                    : "text-purple-200 hover:bg-white/5 hover:text-white",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-all",
                    isActive
                      ? `bg-gradient-to-br ${item.gradient}`
                      : "bg-white/10 group-hover:bg-white/20",
                  )}
                >
                  <IconComponent size={20} className="text-white" />
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 relative"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-md">
                <span className="text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Usuario"}
                </p>
                <p className="text-xs text-purple-300">
                  {user?.role === "ADMIN" ? "Administrador" : "Vendedor"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-rose-300 hover:text-rose-200 transition-all"
              >
                <Logout03Icon size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <button
                onClick={onToggle}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-md hover:opacity-90 transition-all"
              >
                <span className="text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((prev) => !prev);
  return { collapsed, toggle, setCollapsed };
}
