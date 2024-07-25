import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { env } from "./env/schema";

export const app = fastify();

app.register(cors, {
    origin: '*'
});

app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    },
});

app.register(organizationsRoutes);