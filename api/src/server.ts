import { buildApp, AppWithContainer } from './app';
import { DatabaseService } from './services/database.service';

const { app } = buildApp() as AppWithContainer;

const start = async () => {
  try {
    await app.listen({ 
      port: 3001, 
      host: '0.0.0.0' 
    });
    console.log(`Server running at http://localhost:3001`);
    
    // Verificar conexión a DB
    try {
      const dbService = app.container.resolve<DatabaseService>('databaseService');
      await dbService.getProducts();
      console.log('✅ Conexión a la base de datos establecida');
    } catch (dbError) {
      console.error('❌ Error conectando a la base de datos:', dbError);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Manejar shutdowns
const shutdown = async () => {
  console.log('Recibida señal de terminación, cerrando servidor...');
  await app.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

start();