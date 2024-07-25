import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe('Register e2e', () => {

    beforeEach(async () => {
        await app.ready()
    });

    afterEach(async() => {
        await app.close()
    });


    it('should be able to register a new organization', async () => {
        const response = await request(app.server)
            .post('/register')
            .send({
                responsibleName: 'Admin',
                name: 'Organization 1',
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

        expect(response.statusCode).toEqual(201);
    });
});