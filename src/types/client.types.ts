export interface Client {
  id: string;
  name: string;
  taxId: string;
  taxCondition: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientWithStats extends Client {
  salesCount: number;
  totalSpent: number;
}

export interface CreateClientDto {
  name: string;
  taxId: string;
  taxCondition: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateClientDto extends Partial<CreateClientDto> {}
