import {
  BRAND_CONFIGS,
  DEFAULT_BRAND_CONFIG,
} from "@/constants/brand-config.constant";
import type { BrandConfig } from "@/types/brand.types";

export function getBrandConfig(brandName: string): BrandConfig | null {
  const normalized = brandName.toUpperCase().trim();
  return BRAND_CONFIGS[normalized] || null;
}

export function getDefaultBrandConfig(): BrandConfig {
  return DEFAULT_BRAND_CONFIG;
}

export function isBrandConfigured(brandName: string): boolean {
  const normalized = brandName.toUpperCase().trim();
  return normalized in BRAND_CONFIGS;
}

export function getAllConfiguredBrands(): string[] {
  return Object.keys(BRAND_CONFIGS);
}
