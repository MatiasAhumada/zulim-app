"use client";

import { Sidebar, useSidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed, toggle } = useSidebar();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a0f2e 0%, #2f184b 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
            <span className="text-white font-bold text-3xl">Z</span>
          </div>
          <p className="text-purple-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fdfcfe 0%, #f4effa 50%, #e8d1ff 100%)",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={toggle}
        role={user.role.toLowerCase() as "admin" | "seller"}
      />
      <main
        className="pt-6 px-6 pb-6 min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? "96px" : "280px" }}
      >
        {children}
      </main>
    </div>
  );
}
