import { prisma } from "@/lib/prisma";
import { Product, UnitType } from "@prisma/client";

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
  includeDeleted?: boolean;
}

export const productRepository = {
  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  async findBySku(sku: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { sku },
    });
  },

  async findMany({ search, includeDeleted = false }: FindManyParams = {}): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        deletedAt: includeDeleted ? undefined : null,
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { sku: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(dto: CreateProductDto): Promise<Product> {
    const salePrice = dto.retailPrice;

    return prisma.product.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        description: dto.description ?? null,
        unitType: dto.unitType,
        minSaleQuantity: dto.minSaleQuantity ?? 1,
        maxSaleQuantity: dto.maxSaleQuantity ?? null,
        purchasePrice: dto.purchasePrice,
        profitMargin: dto.profitMargin,
        retailPrice: dto.retailPrice,
        wholesalePrice: dto.wholesalePrice,
        salePrice,
        stock: dto.stock ?? 0,
      },
    });
  },

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updateData: Record<string, unknown> = { ...dto };

    if (dto.retailPrice) {
      updateData.salePrice = dto.retailPrice;
    }

    return prisma.product.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};

export type ProductRepository = typeof productRepository;
