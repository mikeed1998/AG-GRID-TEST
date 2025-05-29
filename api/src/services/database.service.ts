import { PrismaClient } from '@prisma/client';

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); // Instancia directa
  }

  // Método público explícito
  public async getProducts() {
    return this.prisma.product.findMany();
  }

  public async disconnect() {
    await this.prisma.$disconnect();
  }
}