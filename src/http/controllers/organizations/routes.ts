import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { fetchNearbyOrganizations } from "./fetch-nearby-organizations";
import { registerOrganization } from "./register";

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/register', registerOrganization);
    app.post('/sessions', authenticate);
    app.get('/organizations/nearby', fetchNearbyOrganizations);
}