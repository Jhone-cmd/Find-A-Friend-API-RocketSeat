import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { PasswordConfirmInvalidError } from "@/errors/password-confirm-invalid-error";
import { makeRegisterOrganizationUseCase } from "@/use-cases/factories/make-register-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerOrganization(request: FastifyRequest, reply: FastifyReply) {
    const createRegisterBodySchema = z.object({ 
        responsibleName: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        passwordConfirm: z.string().min(8),
        cep: z.string().min(8),
        address: z.string(),
        city: z.string(),
        state: z.string().max(2),
        phone: z.string(),
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180;
        })
    });

    const { responsibleName, name, email, password, passwordConfirm,
        cep, address, city, state, phone, latitude, longitude } = createRegisterBodySchema.parse(request.body);

    try {
        if(password !== passwordConfirm) {
            throw new PasswordConfirmInvalidError()
        }

        const registerUseCase = makeRegisterOrganizationUseCase()
        await registerUseCase.execute({
            responsibleName, name, email, password,
            cep, city, state, address, phone, latitude, longitude
        });
        
    } catch (error) {
        if(error instanceof EmailAlreadyExistsError) {
            reply.status(409).send({ message: error.message });
        }
        throw error;
        
    }
    return reply.status(201).send();
}
