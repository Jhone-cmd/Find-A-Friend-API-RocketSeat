import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { PasswordConfirmInvalidError } from "./errors/password-confirm-invalid-error";


type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {

    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation Error",
            error: error.format(),
        });
    }

    if (error instanceof PasswordConfirmInvalidError) {
        return reply.status(400).send({ message: error.message });
    }

    console.error(error);
    return reply.status(500).send({ message: 'Internal Server Error' });
}