import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganizationAndPet } from "@/utils/create-and-authenticate-organization";

describe('Create Pet e2e', () => {

    beforeEach(async () => {
        await app.ready()
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to create a new pet', async () => {
        const { orgId, token } = await createAndAuthenticateOrganizationAndPet(app);

         const response = await request(app.server)
            .post(`/organization/${orgId}/pets/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Pet',
                about: 'pet de teste',
                age: 'child',
                type: 'dog',
                energy: 'high',
                environment: 'broad',
                requirements: JSON.stringify(['Requisito 1', 'Requisito 2']),
                size: 'small',
                independence: 'high',
            });
            
        expect(response.statusCode).toEqual(201);
    });
});