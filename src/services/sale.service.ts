import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import { Sale, CreateSaleDto, SaleWithDetails } from "@/types/sale.types";

export const saleService = {
  async create(dto: CreateSaleDto): Promise<Sale> {
    const { data } = await clientAxios.post(API_ROUTES.SALES, dto);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await clientAxios.delete(API_ROUTES.SALE(id));
  },

  async findById(id: string): Promise<SaleWithDetails> {
    const { data } = await clientAxios.get(API_ROUTES.SALE(id));
    return data;
  },

  async findAll(search?: string): Promise<Sale[]> {
    const params = search ? { search } : {};
    const { data } = await clientAxios.get(API_ROUTES.SALES, { params });
    return data;
  },
};
