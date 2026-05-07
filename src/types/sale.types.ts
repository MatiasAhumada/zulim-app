import { UnitType } from "@prisma/client";

export type PaymentMethod =
  | "EFECTIVO"
  | "TRANSFERENCIA"
  | "DEBITO"
  | "CREDITO"
  | "MERCADOPAGO";
export type InvoiceType = "A" | "B" | "C" | "TICKET";

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  unitType: UnitType;
}

export interface Sale {
  id: string;
  saleNumber: number;
  totalAmount: number;
  roundedAmount: number;
  paymentMethod: PaymentMethod;
  sellerId: string | null;
  sellerName?: string;
  clientId: string | null;
  clientName?: string;
  items: SaleItem[];
  invoice?: Invoice;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  saleId: string;
  invoiceType: InvoiceType;
  invoiceNumber: string;
  cae: string | null;
  caeExpiration: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSaleDto {
  clientId?: string;
  paymentMethod: PaymentMethod;
  items: CreateSaleItemDto[];
  generateInvoice?: boolean;
  invoiceType?: InvoiceType;
}

export interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface SaleWithDetails extends Sale {
  items: SaleItem[];
}
