import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetDetailsPetUseCase } from "@/use-cases/factories/make-get-details-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function getDetailsPet(request: FastifyRequest, reply: FastifyReply) {

    const getDetailsPetParamsSchema = z.object({
        id: z.string().uuid()
    });

    const { id } = getDetailsPetParamsSchema.parse(request.params);

    try {
       
        const getDetailsPetUseCase = makeGetDetailsPetUseCase();
        const pet = await getDetailsPetUseCase.execute({ id });

        return pet;

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ message: error.message });
        }

        throw error;
    }
}
