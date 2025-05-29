import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productData = [
  {
    name: "Laptop X1 Carbon",
    value: 1450.99,
    category: "Tecnología",
    inStock: true,
    supplier: "TechCorp"
  },
  {
    name: "Silla Ergonómica",
    value: 320.50,
    category: "Mobiliario",
    inStock: false,
    supplier: "OfficeDesign"
  },
  {
    name: "Monitor 27\" 4K",
    value: 429.99,
    category: "Tecnología",
    inStock: true,
    supplier: "DisplayTech"
  },
  {
    name: "Teclado Mecánico",
    value: 89.95,
    category: "Accesorios",
    inStock: true,
    supplier: "KeyMaster"
  },
  {
    name: "Mouse Inalámbrico",
    value: 45.60,
    category: "Accesorios",
    inStock: false,
    supplier: "TechCorp"
  },
  {
    name: "Escritorio Ejecutivo",
    value: 575.00,
    category: "Mobiliario",
    inStock: true,
    supplier: "OfficeDesign"
  },
  {
    name: "Paquete de Software",
    value: 1200.00,
    category: "Software",
    inStock: true,
    supplier: "SoftSolutions"
  },
  {
    name: "Impresora Laser",
    value: 299.99,
    category: "Tecnología",
    inStock: false,
    supplier: "PrintMaster"
  },
  {
    name: "Servidor Empresarial",
    value: 4500.00,
    category: "Hardware",
    inStock: true,
    supplier: "TechCorp"
  },
  {
    name: "Router WiFi 6",
    value: 189.95,
    category: "Redes",
    inStock: true,
    supplier: "NetGear"
  }
];

async function main() {
  console.log(`Iniciando seeding...`);
  
  await prisma.product.createMany({
    data: productData,
    skipDuplicates: true,
  });
  
  console.log(`Seeding completado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });