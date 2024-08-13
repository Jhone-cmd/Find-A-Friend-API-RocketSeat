import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { hash } from "bcryptjs";

export async function createAndAuthenticateOrganizationAndPet(app: FastifyInstance) {
    const org1 = await prisma.organization.create({
        data: {
            responsibleName: 'Admin',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash("12345678", 6),
            cep: '12345678',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: ' +55 99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        }
    });

    const pet = await prisma.pet.create({
        data: {
            name: 'Pet test',
            about: 'pet de teste',
            age: 'child',
            type: 'dog',
            energy: 'high',
            environment: 'broad',
            requirements: 'requisito obrigatório',
            size: 'small',
            independence: 'high',
            organizationId: org1.id
        }
    })

    // const pets = await prisma.pet.createMany({
    //     data: [
    //     {
    //         name: 'Pet 1',
    //         about: 'pet de teste',
    //         age: 'child',
    //         type: 'dog',
    //         energy: 'high',
    //         environment: 'broad',
    //         requirements: 'requisito obrigatório',
    //         size: 'small',
    //         independence: 'high',
    //         organizationId: org1.id
    //     }, 
    //     {
    //         name: 'Pet 2',
    //         about: 'pet de teste',
    //         age: 'child',
    //         type: 'dog',
    //         energy: 'high',
    //         environment: 'broad',
    //         requirements: 'requisito obrigatório',
    //         size: 'small',
    //         independence: 'high',
    //         organizationId: org1.id
    //     }]
    // });

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: "organizationAdmin@email.com",
            password: "12345678"
        });
    
    
        
    const orgId: string = org1.id;
    const { city } = org1
    const { id, age, size, energy, environment, independence } = pet;
    const { token } = authResponse.body;

    return { orgId, token, id, city,  age, size, energy, environment, independence }
}