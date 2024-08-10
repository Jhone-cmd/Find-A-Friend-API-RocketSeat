import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { getDetailsPet } from "./get-details-pet";
import { createPet } from "./create-pet";
import { fetchListPets } from "./fetch-list-pets";
import { upload } from "@/lib/multer";

export async function petsRoutes(app: FastifyInstance) {
    
    app.post('/organization/:orgId/pets/create',{ onRequest: [verifyJwt], 
        preHandler: [ upload.array('photos', 10) ]  }, createPet);

    app.get('/pets/:id', getDetailsPet);
    app.get('/pets', fetchListPets);
}