import { makeFetchNearbyOrganizationUseCase } from "@/use-cases/factories/make-fetch-nearby-organizations";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchNearbyOrganizations(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearbyOrganizationsParamsSchema = z.object({ 
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180;
        })
    });

    const { latitude, longitude } = fetchNearbyOrganizationsParamsSchema.parse(request.query);

    const fetchNearbyOrganizationsUseCase = makeFetchNearbyOrganizationUseCase();
    const organizations = await fetchNearbyOrganizationsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })


    return organizations;
    
}
