"use client";

import { motion } from "framer-motion";
import { formatCurrency, roundToHundred } from "@/utils/currency.util";
import { UI_TEXT } from "@/constants/ui-text.constant";

interface RoundedTotalProps {
  subtotal: number;
}

export function RoundedTotal({ subtotal }: RoundedTotalProps) {
  const rounded = roundToHundred(subtotal);
  const difference = rounded - subtotal;

  return (
    <div className="bg-gradient-to-r from-[#532b88] to-[#724aa4] rounded-xl p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80">
          {UI_TEXT.POS_COMPONENTS.ROUNDED_TOTAL.SUBTOTAL}
        </span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="border-t border-white/20 pt-2 mt-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/70">
            {UI_TEXT.POS_COMPONENTS.ROUNDED_TOTAL.ROUNDING}
          </span>
          <span className="text-sm text-white/70">
            +{formatCurrency(difference)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg">
            {UI_TEXT.POS_COMPONENTS.ROUNDED_TOTAL.TOTAL}
          </span>
          <motion.span
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-bold text-2xl"
          >
            {formatCurrency(rounded)}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
