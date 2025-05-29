import { FastifyInstance } from 'fastify';
import { DataService } from '../services/data.service';

export function registerDataRoutes(fastify: FastifyInstance, dataService: DataService) {
  fastify.get('/data', async (request, reply) => {
    try {
      const data = await dataService.getData();
      return reply.status(200).send(data);
    } catch (error: unknown) { 
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      
      return reply.status(500).send({
        success: false,
        message: "Error al recuperar los datos",
        error: errorMessage
      });
    }
  });
}