import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/types/product.types";

export const productService = {
  async create(dto: CreateProductDto): Promise<Product> {
    const { data } = await clientAxios.post(API_ROUTES.PRODUCTS, dto);
    return data.data;
  },

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const { data } = await clientAxios.put(API_ROUTES.PRODUCT(id), dto);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await clientAxios.delete(API_ROUTES.PRODUCT(id));
  },

  async findById(id: string): Promise<Product> {
    const { data } = await clientAxios.get(API_ROUTES.PRODUCT(id));
    return data;
  },

  async findAll(search?: string): Promise<Product[]> {
    const params = search ? { search } : {};
    const { data } = await clientAxios.get(API_ROUTES.PRODUCTS, { params });
    return data;
  },
};
