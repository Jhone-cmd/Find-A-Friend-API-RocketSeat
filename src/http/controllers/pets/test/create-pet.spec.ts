import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganizationAndPet } from "@/utils/create-and-authenticate-organization";

describe('Register e2e', () => {

    beforeEach(async () => {
        await app.ready()
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to create a new pet', async () => {
        const { orgId, token } = await createAndAuthenticateOrganizationAndPet(app);

        const response = await request(app.server)
            .post(`/organization/${orgId}/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Pet 1',
                about: 'pet de teste',
                age: 'child',
                energy: 'high',
                environment: 'broad',
                requirements: 'requisito obrigatório',
                size: 'small',
                independence: 'high',
            });
            
        expect(response.statusCode).toEqual(201);
    });
});