export type UnitType = "KG" | "METERS" | "UNIT";

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  unitType: UnitType;
  minSaleQuantity: number;
  maxSaleQuantity: number | null;
  purchasePrice: number;
  profitMargin: number;
  retailPrice: number;
  wholesalePrice: number;
  salePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  unitType: UnitType;
  minSaleQuantity?: number;
  maxSaleQuantity?: number;
  purchasePrice: number;
  profitMargin: number;
  retailPrice: number;
  wholesalePrice: number;
  stock?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
