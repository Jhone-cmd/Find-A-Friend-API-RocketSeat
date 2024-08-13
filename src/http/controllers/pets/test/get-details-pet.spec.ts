import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganizationAndPet } from "@/utils/create-and-authenticate-organization";

describe('Get Details Pet e2e', () => {

    beforeEach(async () => {
        await app.ready()
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to get details pet', async () => {
        const { id } = await createAndAuthenticateOrganizationAndPet(app);
    
        const response = await request(app.server)
            .get(`/pets/${id}`)
            .send();        

        expect(response.statusCode).toEqual(200);
        expect(response.body.pet).toEqual(expect.objectContaining({ name: 'Pet test' }));
    });
});