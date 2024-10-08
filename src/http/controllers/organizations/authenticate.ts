import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateOrganizationUseCase } from "@/use-cases/factories/male-authenticate-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({ 
        email: z.string().email(),
        password: z.string().min(8),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

   const authenticateUseCase = makeAuthenticateOrganizationUseCase();
   const { organization }  = await authenticateUseCase.execute({ email, password });

   try {
        const token = await reply.jwtSign({}, {
            sign: {
                sub: organization.id
            }
        });

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: organization.id,
                expiresIn: '7d'
            }
        })

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true,
            })
            .status(200).send({ token });
        
   } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            reply.status(400).send({ message: error.message });
        }

        throw error;
   }
    
}
