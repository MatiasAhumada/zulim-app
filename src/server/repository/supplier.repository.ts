import { prisma } from "@/lib/prisma";

export class SupplierRepository {
  async findByName(name: string) {
    return await prisma.supplier.findUnique({
      where: { name },
    });
  }

  async create(name: string) {
    return await prisma.supplier.create({
      data: { name },
    });
  }

  async upsert(name: string) {
    return await prisma.supplier.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  async bulkUpsert(names: string[]) {
    const uniqueNames = [...new Set(names)];
    const suppliers = await Promise.all(
      uniqueNames.map((name) => this.upsert(name)),
    );
    return suppliers;
  }
}
