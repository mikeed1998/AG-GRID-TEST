import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { configureContainer } from './container';
import { registerMainRoutes } from './routes';
import { registerDataRoutes } from './routes/data.route';
import { DataService } from './services/data.service';
import { DatabaseService } from './services/database.service'; // Añadir esta importación

export const buildApp = () => {
  const app = fastify({ logger: true });
  
  // Registrar CORS antes que las rutas
  app.register(fastifyCors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });

  const container = configureContainer();
  const dataService = container.resolve<DataService>('dataService');

  // Añadir container a la instancia de Fastify para acceso posterior
  (app as any).container = container;

  registerMainRoutes(app);
  registerDataRoutes(app, dataService);

  return { app, container };
};

// Exportar tipos para uso en server.ts
export interface AppWithContainer extends ReturnType<typeof buildApp> {
  app: fastify.FastifyInstance & {
    container: ReturnType<typeof configureContainer>;
  };
}

export const app = buildApp().app;