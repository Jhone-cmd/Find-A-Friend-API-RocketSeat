import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeFetchListPetsUseCase } from "@/use-cases/factories/make-fetch-list-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function fetchListPets(request: FastifyRequest, reply: FastifyReply) {

    const fetchListPetsQuerySchema = z.object({
        city: z.string(),
        size: z.string().optional(), 
        age: z.string().optional(), 
        type: z.string().optional(),
        energy: z.string().optional(), 
        independence: z.string().optional(), 
        environment: z.string().optional()
    });

    const { city, age, type, size, energy, environment, independence } = fetchListPetsQuerySchema.parse(request.query);

    try {       
        const fetchListPetsUseCase = makeFetchListPetsUseCase();
        const pets = await fetchListPetsUseCase.execute({ 
            city, age, type, size, energy, environment, independence
        });

        return pets;

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ message: error.message });
        }

        throw error;
    }
}
