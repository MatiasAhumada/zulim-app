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
    await prisma.user.delete({
      where: { id },
    });
  },

  async findMany(): Promise<User[]> {
    return prisma.user.findMany();
  },
};

export type UserRepository = typeof userRepository;
