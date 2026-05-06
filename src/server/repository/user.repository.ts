import { prisma } from "@/lib/prisma";
import { User, Role } from "@prisma/client";

interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

interface FindByEmailParams {
  email: string;
}

interface FindManyParams {
  search?: string;
  role?: Role;
  includeDeleted?: boolean;
}

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail({ email }: FindByEmailParams): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findMany({ search, role, includeDeleted = false }: FindManyParams = {}): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        deletedAt: includeDeleted ? undefined : null,
        ...(role && { role }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(dto: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
        role: dto.role ?? "SELLER",
      },
    });
  },

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async countSalesBySeller(sellerId: string): Promise<number> {
    return prisma.sale.count({
      where: { sellerId },
    });
  },
};

export type UserRepository = typeof userRepository;
