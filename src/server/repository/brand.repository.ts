import { prisma } from "@/lib/prisma";

export class BrandRepository {
  async upsert(name: string, supplierId: string) {
    return await prisma.brand.upsert({
      where: {
        name_supplierId: {
          name,
          supplierId,
        },
      },
      update: {},
      create: {
        name,
        supplierId,
      },
    });
  }

  async bulkUpsert(brands: Array<{ name: string; supplierId: string }>) {
    const results = await Promise.all(
      brands.map((brand) => this.upsert(brand.name, brand.supplierId)),
    );
    return results;
  }
}
