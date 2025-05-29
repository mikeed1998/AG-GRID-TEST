import { buildApp } from './app';
import { DatabaseService } from './services/database.service';
import { PrismaClient } from '@prisma/client';
import { DataService } from './services/data.service';


// Función para probar la conexión a la base de datos directamente
async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  try {
    const products = await prisma.product.findMany();
    console.log('✅ Test DB connection - Products found:', products.length);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Función para verificar la inyección de dependencias
function testDIContainer(container: ReturnType<typeof buildApp>['container']) {
  try {
    const dbService = container.resolve<DatabaseService>('databaseService');
    const dataService = container.resolve<DataService>('dataService');
    
    console.log('✅ DI Test: Services resolved correctly');
    return true;
  } catch (error) {
    console.error('❌ DI Test failed:', error);
    return false;
  }
}

const start = async () => {
  try {
    // 1. Construir la aplicación
    const { app, container } = buildApp();

    // 2. Verificar conexión a la base de datos
    if (!await testDatabaseConnection()) {
      throw new Error('Database test failed');
    }

    // 3. Verificar inyección de dependencias
    if (!testDIContainer(container)) {
      throw new Error('Dependency injection test failed');
    }

    // 4. Obtener instancia de DatabaseService para manejo de cierre
    const dbService = container.resolve<DatabaseService>('databaseService');

    // 5. Iniciar el servidor
    await app.listen({ 
      port: 3001, 
      host: '0.0.0.0' 
    });
    console.log(`Server running at http://localhost:3001`);

    // 6. Configurar manejo de cierre
    const shutdown = async () => {
      console.log('\nRecibida señal de terminación...');
      try {
        await dbService.disconnect();
        await app.close();
        console.log('Servidor cerrado correctamente');
        process.exit(0);
      } catch (err) {
        console.error('Error al cerrar:', err);
        process.exit(1);
      }
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

start();