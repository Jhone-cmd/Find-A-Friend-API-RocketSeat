import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
    const createPetParamsSchema = z.object({
        orgId: z.string().uuid()
    });
    const createPetBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.enum(["child", "adult"]).default("child"),
        size: z.enum(["small", "average", "big"]).default("average"),
        energy: z.enum(["low","moderate","high"]).default("moderate"),
        environment: z.enum(["small", "broad"]).default("broad"),
        independence: z.enum(["low","moderate","high"]).default("high"),
        requirements: z.string()
    });

    const { orgId } = createPetParamsSchema.parse(request.params);
    const { name, about, age, size, energy, environment, independence, requirements } = createPetBodySchema.parse(request.body);

    let files = request.files;
    let photos = files.map((file) => ({ url: file.path }));
          
    try {

        
       const createPetUseCase = makeCreatePetUseCase();
       await createPetUseCase.execute({
            name, about, age, size, energy, environment, independence, requirements, photos: photos ?? null,
            organizationId: orgId

       })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.code(404).send({ message: error.message });
        }

        throw error;
    }

    return reply.status(201).send();
    
}