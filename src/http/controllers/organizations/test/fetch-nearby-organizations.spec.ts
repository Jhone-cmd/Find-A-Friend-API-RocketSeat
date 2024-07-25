import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe('Fetch Nearby Organization e2e', () => {

    beforeEach(async () => {
        await app.ready();

        
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to fetch nearby organizations', async () => {

        await request(app.server)
            .post('/register')
            .send({
                responsibleName: 'Admin',
                name: 'Organization Near',
                email: 'organizationAdmin@email.com',
                password: '12345678',
                passwordConfirm: '12345678',
                cep: '12345678',
                address: 'rua nada',
                city: 'Recife',
                state: 'PB',
                phone: ' +55 99 99999999',
                latitude: -16.0366592,
                longitude: -48.0509952
            });

        await request(app.server)
            .post('/register')
            .send({
                responsibleName: 'Admin',
                name: 'Organization Far',
                email: 'organizationAdmin2@email.com',
                password: '12345678',
                passwordConfirm: '12345678',
                cep: '12345678',
                address: 'rua nada',
                city: 'Recife',
                state: 'PB',
                phone: ' +55 99 99999999',
                latitude: -15.5560727,
                longitude: -47.9912768
            });

        const response = await request(app.server)
            .get('/organizations/nearby')
            .query({
                latitude: -16.0366592,
                longitude: -48.0509952
            })
            .send();
        
        expect(response.statusCode).toEqual(200);
        expect(response.body.organizations).toEqual([
            expect.objectContaining({ name: 'Organization Near' })
        ]);
    });
});