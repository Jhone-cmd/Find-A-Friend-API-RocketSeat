import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { getDetailsPet } from "./get-details-pet";
import { createPet } from "./create-pet";
import { fetchListPets } from "./fetch-list-pets";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/organization/:orgId/create', { onRequest: [verifyJwt] }, createPet);
    app.get('/pet/:id', getDetailsPet);
    app.get('/pets', fetchListPets);
}