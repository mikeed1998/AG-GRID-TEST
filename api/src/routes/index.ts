import { FastifyInstance } from 'fastify';

export function registerMainRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return { 
      message: 'API is running', 
      status: 'OK',
      timestamp: new Date().toISOString()
    };
  });
}