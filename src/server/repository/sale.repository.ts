import { prisma } from "@/lib/prisma";
import {
  Sale,
  SaleItem,
  Invoice,
  PaymentMethod,
  InvoiceType,
} from "@prisma/client";

interface CreateSaleDto {
  clientId?: string;
  sellerId?: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  roundedAmount: number;
  items: CreateSaleItemDto[];
  invoice?: CreateInvoiceDto;
}

interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  unitType: string;
}

interface CreateInvoiceDto {
  invoiceType: InvoiceType;
  invoiceNumber: string;
  cae?: string;
  caeExpiration?: Date;
}

interface FindManyParams {
  search?: string;
  includeDeleted?: boolean;
}

export const saleRepository = {
  async findById(id: string) {
    return prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        client: true,
        seller: true,
        invoice: true,
      },
    });
  },

  async findMany({ search, includeDeleted = false }: FindManyParams = {}) {
    return prisma.sale.findMany({
      where: {
        deletedAt: includeDeleted ? undefined : null,
        ...(search && {
          OR: [
            { saleNumber: { equals: parseInt(search) || 0 } },
            { client: { name: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        client: true,
        seller: true,
        invoice: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(dto: CreateSaleDto) {
    return prisma.sale.create({
      data: {
        clientId: dto.clientId ?? null,
        sellerId: dto.sellerId ?? null,
        paymentMethod: dto.paymentMethod,
        totalAmount: dto.totalAmount,
        roundedAmount: dto.roundedAmount,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
            unitType: item.unitType as any,
          })),
        },
        ...(dto.invoice && {
          invoice: {
            create: {
              invoiceType: dto.invoice.invoiceType,
              invoiceNumber: dto.invoice.invoiceNumber,
              cae: dto.invoice.cae ?? null,
              caeExpiration: dto.invoice.caeExpiration ?? null,
            },
          },
        }),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        client: true,
        seller: true,
        invoice: true,
      },
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.sale.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async updateProductStock(productId: string, quantity: number) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  },

  async getTotalSales(): Promise<number> {
    const result = await prisma.sale.aggregate({
      where: { deletedAt: null },
      _sum: { roundedAmount: true },
    });
    return Number(result._sum.roundedAmount ?? 0);
  },

  async countSales(): Promise<number> {
    return prisma.sale.count({
      where: { deletedAt: null },
    });
  },
};

export type SaleRepository = typeof saleRepository;
