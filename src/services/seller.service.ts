import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  Seller,
  SellerWithStats,
  CreateSellerDto,
  UpdateSellerDto,
} from "@/types/seller.types";

export const sellerService = {
  async create(dto: CreateSellerDto): Promise<Seller> {
    const { data } = await clientAxios.post(API_ROUTES.SELLERS, dto);
    return data.data;
  },

  async update(id: string, dto: UpdateSellerDto): Promise<Seller> {
    const { data } = await clientAxios.put(API_ROUTES.SELLER(id), dto);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await clientAxios.delete(API_ROUTES.SELLER(id));
  },

  async findById(id: string): Promise<SellerWithStats> {
    const { data } = await clientAxios.get(API_ROUTES.SELLER(id));
    return data;
  },

  async findAll(search?: string): Promise<Seller[]> {
    const params = search ? { search } : {};
    const { data } = await clientAxios.get(API_ROUTES.SELLERS, { params });
    return data;
  },
};
