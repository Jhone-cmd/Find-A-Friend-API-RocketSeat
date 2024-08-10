import { InvalidRequestError } from "@/errors/invalid-request-error";
import { PetNameAlreadyExistsError } from "@/errors/pet-name-already-exists-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { FilePath } from "@/interfaces/pet-interfaces";
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
        type: z.enum(["dog", "cat"]).default("dog"),
        size: z.enum(["small", "average", "big"]).default("average"),
        energy: z.enum(["low","moderate","high"]).default("moderate"),
        environment: z.enum(["small", "broad"]).default("broad"),
        independence: z.enum(["low","moderate","high"]).default("high"),
        requirements: z.string()
    });

    const { orgId } = createPetParamsSchema.parse(request.params);
    const { name, about, age, type, size, energy, environment, independence, requirements } = createPetBodySchema.parse(request.body);

    const images: FilePath[] = request.files
        .map((file) => ({ url: file.path ?? ""}));
    
    const photo = images[0].url;

    try {
       
       const createPetUseCase = makeCreatePetUseCase();
       await createPetUseCase.execute({
            name, about, age, type, size, energy, environment, independence, requirements, 
            images, photo,
            organizationId: orgId

       })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            reply.code(404).send({ message: error.message });
        } 
        
        if (error instanceof PetNameAlreadyExistsError) {
            reply.code(400).send({ message: error.message });
        } 
        
        if (error instanceof InvalidRequestError) {
            reply.code(400).send({ message: error.message });
        }
        throw error;
    }

    return reply.status(201).send();
    
}