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
  },
  {
    name: "Laptop Ultradelgada Premium de 15.6 Pulgadas con Procesador Intel Core i7 de 11va Generación y 16GB RAM",
    value: 1899.99,
    category: "Tecnología",
    inStock: true,
    supplier: "TechCorp"
  },
  {
    name: "Silla Ejecutiva Ergonómica de Alta Gama con Soporte Lumbar Ajustable y Reposabrazos Multidimensionales",
    value: 450.75,
    category: "Mobiliario",
    inStock: true,
    supplier: "OfficeDesign"
  },
  {
    name: "Monitor Curvo Gaming de 32 Pulgadas QHD 144Hz con Tecnología HDR y Tiempo de Respuesta 1ms",
    value: 599.99,
    category: "Tecnología",
    inStock: false,
    supplier: "DisplayTech"
  },
  {
    name: "Teclado Mecánico para Gaming con Interruptores Cherry MX Red Retroiluminación RGB Personalizable",
    value: 129.95,
    category: "Accesorios",
    inStock: true,
    supplier: "KeyMaster"
  },
  {
    name: "Mouse Inalámbrico Ergonomico con Seguimiento de 16000 DPI y Batería Recargable de Larga Duración",
    value: 79.60,
    category: "Accesorios",
    inStock: true,
    supplier: "TechCorp"
  },
  {
    name: "Escritorio Ejecutivo Moderno de Madera Maciza con Sistema de Cable Management y Superficie Resistente",
    value: 725.00,
    category: "Mobiliario",
    inStock: false,
    supplier: "OfficeDesign"
  },
  {
    name: "Suite Completa de Software Empresarial para Gestión Integral de Proyectos y Colaboración en Equipo",
    value: 1500.00,
    category: "Software",
    inStock: true,
    supplier: "SoftSolutions"
  },
  {
    name: "Impresora Multifunción Laser Color de Alta Velocidad con Conectividad WiFi y Duplex Automático",
    value: 399.99,
    category: "Tecnología",
    inStock: true,
    supplier: "PrintMaster"
  },
  {
    name: "Servidor Empresarial Rackeable de Doble Procesador con 64GB RAM y Almacenamiento SSD de 2TB RAID",
    value: 5200.00,
    category: "Hardware",
    inStock: false,
    supplier: "TechCorp"
  },
  {
    name: "Router WiFi 6 Mesh de Triple Banda con Cobertura para Casas Grandes y Tecnología de Bajo Latencia",
    value: 249.95,
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