export interface ProductImportRow {
  variantName: string; // Nombre de la variante
  sku: string; // Art (SKU del producto base)
  categoryName: string; // Estampadas (nombre del producto base)
  brandName: string; // CORDÓN DE ORO
  supplierName: string; // Nombre de la hoja

  // Cantidades y unidades
  quantityPerPiece: number; // cant (metros por pieza)
  unitType: "KG" | "METERS" | "UNIT";

  // Precios
  pricePerMeter: number; // xmtr (precio por metro)
  pricePerPiece: number; // xpza (precio por pieza)
  wholesalePrice: number; // xmay (precio mayorista)
  maxDiscountPrice?: number; // MAX (máximo descuento)
  factoryDiscountPrice?: number; // c/el dscto (precio con descuento de fábrica)
  costPrice: number; // costo (costo del producto)

  // Reglas de negocio
  wholesaleMinQuantity?: number; // 6 o+
  maxDiscountMinQuantity?: number; // 10 o+

  // Calculados
  profitMargin: number;
  description?: string;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: ImportError[];
}

export interface ImportError {
  row: number;
  field?: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface ParsedImportData {
  valid: ProductImportRow[];
  invalid: ImportError[];
}
