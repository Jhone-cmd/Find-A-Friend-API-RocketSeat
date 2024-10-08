import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { env } from "./env/schema";
import { petsRoutes } from "./http/controllers/pets/routes";
import { errorHandler } from "./error-handler";
import multer from "fastify-multer";

export const app = fastify();

app.register(cors, {
    origin: '*'
});

app.register(fastifyCookie);

app.register(jwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    },
});

app.register(multer.contentParser)

app.register(organizationsRoutes);
app.register(petsRoutes);

app.setErrorHandler(errorHandler);