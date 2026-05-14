export const IMPORT_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_EXTENSIONS: [".xlsx", ".xls", ".csv"],
  BATCH_SIZE: 100,
} as const;

export const IMPORT_COLUMNS = {
  SKU: "sku",
  VARIANT_NAME: "variante",
  STOCK: "cant",
  RETAIL_PRICE: "xmtr",
  SALE_PRICE: "xpza",
  WHOLESALE_PRICE: "xmay",
  MAX_PRICE: "max",
  PURCHASE_PRICE: "costo_unita",
  UNIT_TYPE: "unidad",
} as const;

export const REQUIRED_COLUMNS = [
  IMPORT_COLUMNS.SKU,
  IMPORT_COLUMNS.VARIANT_NAME,
  IMPORT_COLUMNS.STOCK,
  IMPORT_COLUMNS.RETAIL_PRICE,
  IMPORT_COLUMNS.SALE_PRICE,
  IMPORT_COLUMNS.WHOLESALE_PRICE,
  IMPORT_COLUMNS.PURCHASE_PRICE,
] as const;

export const UNIT_TYPE_MAP: Record<string, "KG" | "METERS" | "UNIT"> = {
  kg: "KG",
  kilo: "KG",
  kilogramo: "KG",
  metro: "METERS",
  metros: "METERS",
  m: "METERS",
  unidad: "UNIT",
  unidades: "UNIT",
  u: "UNIT",
  pieza: "UNIT",
  piezas: "UNIT",
};
