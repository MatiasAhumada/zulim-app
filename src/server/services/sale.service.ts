import { saleRepository } from "@/server/repository/sale.repository";
import { productRepository } from "@/server/repository/product.repository";
import { PaymentMethod, InvoiceType } from "@prisma/client";
import httpStatus from "http-status";
import { SALE_MESSAGES } from "@/constants/sale.constant";
import { roundToHundred } from "@/utils/currency.util";

interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface CreateSaleDto {
  clientId?: string;
  sellerId?: string;
  paymentMethod: PaymentMethod;
  items: CreateSaleItemDto[];
  generateInvoice?: boolean;
  invoiceType?: InvoiceType;
}

interface FindManyParams {
  search?: string;
}

export const saleService = {
  async findById(id: string) {
    const sale = await saleRepository.findById(id);

    if (!sale) {
      const error = new Error(SALE_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    return sale;
  },

  async findMany({ search }: FindManyParams = {}) {
    return saleRepository.findMany({ search });
  },

  async create(dto: CreateSaleDto) {
    if (!dto.items || dto.items.length === 0) {
      const error = new Error(SALE_MESSAGES.INVALID_ITEMS) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    for (const item of dto.items) {
      if (item.quantity <= 0) {
        const error = new Error(SALE_MESSAGES.INVALID_QUANTITY) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.BAD_REQUEST;
        throw error;
      }

      const product = await productRepository.findById(item.productId);
      if (!product) {
        const error = new Error(SALE_MESSAGES.NOT_FOUND) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.NOT_FOUND;
        throw error;
      }

      if (product.stock < item.quantity) {
        const error = new Error(SALE_MESSAGES.INSUFFICIENT_STOCK) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.BAD_REQUEST;
        throw error;
      }
    }

    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const roundedAmount = roundToHundred(totalAmount);

    const saleData = {
      clientId: dto.clientId,
      sellerId: dto.sellerId,
      paymentMethod: dto.paymentMethod,
      totalAmount,
      roundedAmount,
      items: await Promise.all(
        dto.items.map(async (item) => {
          const product = await productRepository.findById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.quantity * item.unitPrice,
            unitType: product!.unitType,
          };
        })
      ),
      ...(dto.generateInvoice &&
        dto.invoiceType && {
          invoice: {
            invoiceType: dto.invoiceType,
            invoiceNumber: `${dto.invoiceType}-${Date.now()}`,
          },
        }),
    };

    const sale = await saleRepository.create(saleData);

    for (const item of dto.items) {
      await saleRepository.updateProductStock(item.productId, item.quantity);
    }

    return sale;
  },

  async delete(id: string): Promise<void> {
    const sale = await saleRepository.findById(id);

    if (!sale) {
      const error = new Error(SALE_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    await saleRepository.delete(id);
  },
};

export type SaleService = typeof saleService;
