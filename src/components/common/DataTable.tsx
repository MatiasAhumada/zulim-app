import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  totalLabel?: string;
  onRowClick?: (item: T) => void;
  expandedContent?: (item: T) => ReactNode;
}

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
  emptyMessage = "No hay datos disponibles",
  loading = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  actions,
  totalLabel,
  onRowClick,
  expandedContent,
}: DataTableProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="lg:ml-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2f184b] uppercase tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#4a4451] mt-1 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">{actions}</div>
        )}
      </div>

      <div className="border border-[#c8b1e4] rounded-xl shadow-lg bg-white">
        {onSearch && (
          <div className="p-5 border-b border-[#c8b1e4]">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search01Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4451]"
              />
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-white border-[#c8b1e4] text-[#2f184b] placeholder:text-[#4a4451]/50 focus:border-[#532b88] focus:ring-[#532b88] text-sm"
              />
            </div>
          </div>
        )}

        <div className="p-5 overflow-visible">
          <div className="w-full overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#c8b1e4] text-left text-xs font-semibold text-[#4a4451] uppercase tracking-wider">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`pb-3 font-semibold ${column.className || ""}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-8 text-center text-[#4a4451] font-medium"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#532b88] border-t-transparent rounded-full animate-spin" />
                        Cargando...
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-8 text-center text-[#4a4451] font-medium"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <>
                      <motion.tr
                        key={keyExtractor(item)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: shouldReduceMotion ? 0 : index * 0.03,
                        }}
                        onClick={() => onRowClick?.(item)}
                        className={`border-b border-[#c8b1e4] hover:bg-[#f4effa] transition-colors ${
                          onRowClick ? "cursor-pointer" : ""
                        }`}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="py-4 text-sm font-medium text-[#2f184b]"
                          >
                            {column.render
                              ? column.render(item)
                              : (item as any)[column.key]}
                          </td>
                        ))}
                      </motion.tr>
                      {expandedContent?.(item)}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalLabel && (
            <div className="mt-4 pt-4 border-t border-[#c8b1e4]">
              <p className="text-xs font-medium text-[#4a4451] uppercase tracking-wider">
                {totalLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
