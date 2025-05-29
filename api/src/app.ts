import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { configureContainer } from './container';
import { registerMainRoutes } from './routes';
import { registerDataRoutes } from './routes/data.route';
import { DataService } from './services/data.service';

declare module 'fastify' {
  interface FastifyInstance {
    container: ReturnType<typeof configureContainer>;
  }
}

export interface AppWithContainer {
  app: FastifyInstance & {
    container: ReturnType<typeof configureContainer>;
  };
  container: ReturnType<typeof configureContainer>;
}

export const buildApp = (): AppWithContainer => {
  const app = fastify({ logger: true }) as FastifyInstance & {
    container: ReturnType<typeof configureContainer>;
  };
  
  app.register(fastifyCors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });

  const container = configureContainer();
  
  // Verifica la resolución de dependencias
  try {
    const testService = container.resolve('dataService');
    console.log('✅ Dependencias resueltas correctamente');
  } catch (err) {
    console.error('❌ Error en DI:', err);
    throw err;
  }

  const dataService = container.resolve<DataService>('dataService');
  app.decorate('container', container);
  
  registerMainRoutes(app);
  registerDataRoutes(app, dataService);

  return { app, container };
};

export const app = buildApp().app;