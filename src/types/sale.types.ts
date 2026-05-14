export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  priceAtSale: number;
}

export interface Sale {
  id: string;
  totalAmount: number;
  roundedAmount: number;
  paymentMethod: string;
  invoiceType: string | null;
  cae: string | null;
  caeExpiration: Date | null;
  clientId: string | null;
  createdAt: Date;
}

export interface SaleWithItems extends Sale {
  items: SaleItem[];
}

export interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  priceAtSale: number;
}

export interface CreateSaleDto {
  totalAmount: number;
  roundedAmount: number;
  paymentMethod: string;
  invoiceType?: string;
  clientId?: string;
  items: CreateSaleItemDto[];
}
