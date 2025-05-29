import { PrismaClient } from '@prisma/client';

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct(data: {
    name: string;
    value: number;
    category: string;
    inStock?: boolean;
    supplier?: string;
  }) {
    return this.prisma.product.create({ data });
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

// Exportar el tipo para Prisma Client si es necesario
export type { PrismaClient as PrismaClientType };