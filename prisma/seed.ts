import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const ADMIN_EMAIL = "admin@zulim.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Administrador";

const SELLER_EMAIL = "vendedor@zulim.com";
const SELLER_PASSWORD = "vendedor123";
const SELLER_NAME = "Vendedor";

async function main() {
  console.log("🌱 Iniciando seed...");

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log("✅ Usuario admin ya existe");
  } else {
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
        role: "ADMIN",
      },
    });
    console.log("✅ Usuario admin creado");
  }

  const existingSeller = await prisma.user.findUnique({
    where: { email: SELLER_EMAIL },
  });

  if (existingSeller) {
    console.log("✅ Usuario vendedor ya existe");
  } else {
    await prisma.user.create({
      data: {
        email: SELLER_EMAIL,
        password: SELLER_PASSWORD,
        name: SELLER_NAME,
        role: "SELLER",
      },
    });
    console.log("✅ Usuario vendedor creado");
  }

  console.log("\n📋 Credenciales de acceso:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👤 ADMIN:");
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log("\n👤 VENDEDOR:");
  console.log(`   Email: ${SELLER_EMAIL}`);
  console.log(`   Password: ${SELLER_PASSWORD}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
