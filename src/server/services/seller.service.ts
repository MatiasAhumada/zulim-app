import { userRepository } from "@/server/repository/user.repository";
import { User, Role } from "@prisma/client";
import httpStatus from "http-status";
import { SELLER_MESSAGES } from "@/constants/seller.constant";

interface CreateSellerDto {
  email: string;
  password: string;
  name: string;
}

interface UpdateSellerDto extends Partial<CreateSellerDto> {}

interface FindManyParams {
  search?: string;
}

interface SellerWithStats extends User {
  salesCount: number;
}

export const sellerService = {
  async findById(id: string): Promise<SellerWithStats> {
    const seller = await userRepository.findById(id);

    if (!seller || seller.role !== "SELLER") {
      const error = new Error(SELLER_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    const salesCount = await userRepository.countSalesBySeller(id);

    return {
      ...seller,
      salesCount,
    };
  },

  async findMany({ search }: FindManyParams = {}): Promise<User[]> {
    return userRepository.findMany({ search, role: "SELLER" });
  },

  async create(dto: CreateSellerDto): Promise<User> {
    const existingSeller = await userRepository.findByEmail({
      email: dto.email,
    });

    if (existingSeller) {
      const error = new Error(SELLER_MESSAGES.EMAIL_DUPLICATE) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.CONFLICT;
      throw error;
    }

    if (!dto.email || !dto.email.includes("@")) {
      const error = new Error(SELLER_MESSAGES.INVALID_EMAIL) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (!dto.password || dto.password.length < 6) {
      const error = new Error(SELLER_MESSAGES.INVALID_PASSWORD) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (!dto.name || dto.name.trim().length === 0) {
      const error = new Error(SELLER_MESSAGES.INVALID_NAME) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return userRepository.create({
      ...dto,
      role: "SELLER",
    });
  },

  async update(id: string, dto: UpdateSellerDto): Promise<User> {
    const seller = await userRepository.findById(id);

    if (!seller || seller.role !== "SELLER") {
      const error = new Error(SELLER_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    if (dto.email) {
      const existingSeller = await userRepository.findByEmail({
        email: dto.email,
      });
      if (existingSeller && existingSeller.id !== id) {
        const error = new Error(SELLER_MESSAGES.EMAIL_DUPLICATE) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.CONFLICT;
        throw error;
      }

      if (!dto.email.includes("@")) {
        const error = new Error(SELLER_MESSAGES.INVALID_EMAIL) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.BAD_REQUEST;
        throw error;
      }
    }

    if (dto.password && dto.password.length < 6) {
      const error = new Error(SELLER_MESSAGES.INVALID_PASSWORD) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.name && dto.name.trim().length === 0) {
      const error = new Error(SELLER_MESSAGES.INVALID_NAME) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return userRepository.update(id, dto);
  },

  async delete(id: string): Promise<void> {
    const seller = await userRepository.findById(id);

    if (!seller || seller.role !== "SELLER") {
      const error = new Error(SELLER_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    await userRepository.delete(id);
  },
};

export type SellerService = typeof sellerService;
