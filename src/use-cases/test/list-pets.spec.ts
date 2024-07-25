import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ListPetsUseCase } from "../list-pets";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: ListPetsUseCase;

describe('List Pets Use Case', () => {

    beforeEach(() => {   
        organizationRepository = new InMemoryOrganizationRepository();     
        petRepository = new InMemoryPetRepository(organizationRepository);        
        sut = new ListPetsUseCase(petRepository);
    });

    it('should be able to list pets', async () => {
        
        const organization = await organizationRepository.create({
            responsibleName: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash('123456', 6),
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999'
        });
        
        await petRepository.create({
            name: `Pet 1`,
            about: 'pet de teste',
            age: 'child',
            energy: 'high',
            environment: 'broad',
            requirements: 'requisito obrigatório',
            size: 'small',
            independence: 'high',
            organizationId: organization.id
        });   
        
        const { pets } = await sut.execute({
            city: organization.city
        });
        
        expect(pets).toHaveLength(1);
    });
});
