import { productRepository } from "@/server/repository/product.repository";
import { Product, UnitType } from "@prisma/client";
import httpStatus from "http-status";
import { PRODUCT_MESSAGES } from "@/constants/product.constant";

interface CreateProductDto {
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

interface UpdateProductDto extends Partial<CreateProductDto> {}

interface FindManyParams {
  search?: string;
}

export const productService = {
  async findById(id: string): Promise<Product> {
    const product = await productRepository.findById(id);

    if (!product) {
      const error = new Error(PRODUCT_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    return product;
  },

  async findMany({ search }: FindManyParams = {}): Promise<Product[]> {
    return productRepository.findMany({ search });
  },

  async create(dto: CreateProductDto): Promise<Product> {
    const existingProduct = await productRepository.findBySku(dto.sku);

    if (existingProduct) {
      const error = new Error(PRODUCT_MESSAGES.SKU_DUPLICATE) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.CONFLICT;
      throw error;
    }

    if (dto.purchasePrice <= 0) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_PRICE) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.profitMargin < 0 || dto.profitMargin > 100) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_MARGIN) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.stock && dto.stock < 0) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_STOCK) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return productRepository.create(dto);
  },

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.findById(id);

    if (dto.sku) {
      const existingProduct = await productRepository.findBySku(dto.sku);
      if (existingProduct && existingProduct.id !== id) {
        const error = new Error(PRODUCT_MESSAGES.SKU_DUPLICATE) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.CONFLICT;
        throw error;
      }
    }

    if (dto.purchasePrice && dto.purchasePrice <= 0) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_PRICE) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.profitMargin && (dto.profitMargin < 0 || dto.profitMargin > 100)) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_MARGIN) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.stock && dto.stock < 0) {
      const error = new Error(PRODUCT_MESSAGES.INVALID_STOCK) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return productRepository.update(id, dto);
  },

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await productRepository.delete(id);
  },
};

export type ProductService = typeof productService;
