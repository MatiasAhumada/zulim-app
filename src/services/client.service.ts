import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  Client,
  ClientWithStats,
  CreateClientDto,
  UpdateClientDto,
} from "@/types/client.types";

export const clientService = {
  async create(dto: CreateClientDto): Promise<Client> {
    const { data } = await clientAxios.post(API_ROUTES.CLIENTS, dto);
    return data.data;
  },

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const { data } = await clientAxios.put(API_ROUTES.CLIENT(id), dto);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await clientAxios.delete(API_ROUTES.CLIENT(id));
  },

  async findById(id: string): Promise<ClientWithStats> {
    const { data } = await clientAxios.get(API_ROUTES.CLIENT(id));
    return data;
  },

  async findAll(search?: string): Promise<Client[]> {
    const params = search ? { search } : {};
    const { data } = await clientAxios.get(API_ROUTES.CLIENTS, { params });
    return data;
  },
};
