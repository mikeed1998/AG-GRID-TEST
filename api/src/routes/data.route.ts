import { FastifyInstance } from 'fastify';
import { DataService } from '../services/data.service';

export function registerDataRoutes(fastify: FastifyInstance, dataService: DataService) {
  // Obtener datos
  fastify.get('/data', async (request, reply) => {
    try {
      const data = await dataService.getData();
      return reply.status(200).send(data);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: "Error al recuperar los datos",
        error: error.message
      });
    }
  });
}