"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push("/");
    } catch {
      setError("Email o contraseña incorrectos");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #1a0f2e 0%, #2f184b 50%, #3c2558 100%)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #1a0f2e 0%, #2f184b 50%, #3c2558 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#9b72cf] to-[#532b88] flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <span className="text-white font-bold text-4xl">Z</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white">ZULIM</h1>
            <p className="text-purple-300 mt-2">Sistema Integral de Gestión</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-purple-200 text-sm mb-2 block">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-purple-300/50 focus:border-[#9b72cf] focus:ring-[#9b72cf]"
                placeholder="admin@zulim.com"
                required
              />
            </div>
            <div>
              <Label className="text-purple-200 text-sm mb-2 block">
                Contraseña
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-purple-300/50 focus:border-[#9b72cf] focus:ring-[#9b72cf]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-rose-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-[#9b72cf] to-[#532b88] hover:from-[#724aa4] hover:to-[#3c0e71] text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-purple-300/60 text-sm">
              Credenciales de prueba:
            </p>
            <p className="text-purple-200 text-sm mt-1">
              admin@zulim.com / admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
