import { prisma } from "@/lib/prisma";

export class CategoryRepository {
  async upsert(name: string, brandId: string) {
    return await prisma.category.upsert({
      where: {
        name_brandId: {
          name,
          brandId,
        },
      },
      update: {},
      create: {
        name,
        brandId,
      },
    });
  }

  async bulkUpsert(categories: Array<{ name: string; brandId: string }>) {
    const results = await Promise.all(
      categories.map((category) =>
        this.upsert(category.name, category.brandId),
      ),
    );
    return results;
  }
}
