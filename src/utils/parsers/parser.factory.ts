import type { BrandParser } from "./base.parser";
import { AbraficParser } from "./abrafic.parser";

export function getBrandParser(brandName: string): BrandParser {
  const normalized = brandName.toUpperCase().trim();

  switch (normalized) {
    case "ABRAFIC":
    case "CORDÓN DE ORO":
    case "CORDON DE ORO":
      return new AbraficParser();

    default:
      return new AbraficParser();
  }
}
