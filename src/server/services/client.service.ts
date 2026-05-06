import { clientRepository } from "@/server/repository/client.repository";
import { Client } from "@prisma/client";
import httpStatus from "http-status";
import { CLIENT_MESSAGES } from "@/constants/client.constant";

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
}

interface ClientWithStats extends Client {
  salesCount: number;
  totalSpent: number;
}

export const clientService = {
  async findById(id: string): Promise<ClientWithStats> {
    const client = await clientRepository.findById(id);

    if (!client) {
      const error = new Error(CLIENT_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    const salesCount = await clientRepository.countSalesByClient(id);
    const totalSpent = await clientRepository.getTotalSpentByClient(id);

    return {
      ...client,
      salesCount,
      totalSpent,
    };
  },

  async findMany({ search }: FindManyParams = {}): Promise<Client[]> {
    return clientRepository.findMany({ search });
  },

  async create(dto: CreateClientDto): Promise<Client> {
    const existingClient = await clientRepository.findByTaxId(dto.taxId);

    if (existingClient) {
      const error = new Error(CLIENT_MESSAGES.TAX_ID_DUPLICATE) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.CONFLICT;
      throw error;
    }

    if (!dto.name || dto.name.trim().length === 0) {
      const error = new Error(CLIENT_MESSAGES.INVALID_NAME) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (!dto.taxId || dto.taxId.trim().length === 0) {
      const error = new Error(CLIENT_MESSAGES.INVALID_TAX_ID) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (!dto.taxCondition || dto.taxCondition.trim().length === 0) {
      const error = new Error(
        CLIENT_MESSAGES.INVALID_TAX_CONDITION,
      ) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return clientRepository.create(dto);
  },

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await clientRepository.findById(id);

    if (!client) {
      const error = new Error(CLIENT_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    if (dto.taxId) {
      const existingClient = await clientRepository.findByTaxId(dto.taxId);
      if (existingClient && existingClient.id !== id) {
        const error = new Error(CLIENT_MESSAGES.TAX_ID_DUPLICATE) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.CONFLICT;
        throw error;
      }

      if (dto.taxId.trim().length === 0) {
        const error = new Error(CLIENT_MESSAGES.INVALID_TAX_ID) as Error & {
          statusCode: number;
        };
        error.statusCode = httpStatus.BAD_REQUEST;
        throw error;
      }
    }

    if (dto.name && dto.name.trim().length === 0) {
      const error = new Error(CLIENT_MESSAGES.INVALID_NAME) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    if (dto.taxCondition && dto.taxCondition.trim().length === 0) {
      const error = new Error(
        CLIENT_MESSAGES.INVALID_TAX_CONDITION,
      ) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.BAD_REQUEST;
      throw error;
    }

    return clientRepository.update(id, dto);
  },

  async delete(id: string): Promise<void> {
    const client = await clientRepository.findById(id);

    if (!client) {
      const error = new Error(CLIENT_MESSAGES.NOT_FOUND) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.NOT_FOUND;
      throw error;
    }

    await clientRepository.delete(id);
  },
};

export type ClientService = typeof clientService;
