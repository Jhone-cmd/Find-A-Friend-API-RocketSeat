import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateOrganizationAndPet } from "@/utils/create-and-authenticate-organization";

describe('Fetch List Pets e2e', () => {

    beforeEach(async () => {
        await app.ready()
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to list pets', async () => {
        const { orgId, token, city } = await createAndAuthenticateOrganizationAndPet(app);

        await request(app.server)
            .post(`/organization/${orgId}/pets/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Pet test 2',
                about: 'pet de teste',
                age: 'child',
                type: 'dog',
                energy: 'high',
                environment: 'broad',
                requirements: 'requisito obrigatório',
                size: 'small',
                independence: 'high',
            });

        const response = await request(app.server)
            .get('/pets')
            .query({
                city,
            })
            .send()            
        
        expect(response.status).toEqual(200);
        expect(response.body.pets).toEqual([
            expect.objectContaining({ name: 'Pet test' }),
            expect.objectContaining({ name: 'Pet test 2' })
        ])

    });
});