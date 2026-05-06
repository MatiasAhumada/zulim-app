import { Role } from "@prisma/client";

export interface Seller {
  id: string;
  email: string;
  name: string;
  role: Role;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerWithStats extends Seller {
  salesCount: number;
}

export interface CreateSellerDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateSellerDto extends Partial<CreateSellerDto> {}
