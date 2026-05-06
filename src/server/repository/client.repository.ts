import { prisma } from "@/lib/prisma";
import { Client } from "@prisma/client";

interface CreateClientDto {
  name: string;
  taxId: string;
  taxCondition: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface UpdateClientDto extends Partial<CreateClientDto> {}

interface FindManyParams {
  search?: string;
  includeDeleted?: boolean;
}

export const clientRepository = {
  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id },
    });
  },

  async findByTaxId(taxId: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { taxId },
    });
  },

  async findMany({
    search,
    includeDeleted = false,
  }: FindManyParams = {}): Promise<Client[]> {
    return prisma.client.findMany({
      where: {
        deletedAt: includeDeleted ? undefined : null,
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { taxId: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(dto: CreateClientDto): Promise<Client> {
    return prisma.client.create({
      data: {
        name: dto.name,
        taxId: dto.taxId,
        taxCondition: dto.taxCondition,
        email: dto.email ?? null,
        phone: dto.phone ?? null,
        address: dto.address ?? null,
      },
    });
  },

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data: dto,
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.client.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async countSalesByClient(clientId: string): Promise<number> {
    return prisma.sale.count({
      where: { clientId },
    });
  },

  async getTotalSpentByClient(clientId: string): Promise<number> {
    const result = await prisma.sale.aggregate({
      where: { clientId },
      _sum: { roundedAmount: true },
    });

    return Number(result._sum.roundedAmount ?? 0);
  },
};

export type ClientRepository = typeof clientRepository;
