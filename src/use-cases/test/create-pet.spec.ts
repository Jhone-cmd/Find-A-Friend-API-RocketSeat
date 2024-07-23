import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {

    beforeEach(() => {
        
        petRepository = new InMemoryPetRepository();
        organizationRepository = new InMemoryOrganizationRepository();
        sut = new CreatePetUseCase(petRepository, organizationRepository);
    });

    it('should be able to create pet', async () => {
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

        const { pet } = await sut.execute({
            name: 'Pet 1',
            about: 'pet de teste',
            age: 'child',
            energy: 'high',
            environment: 'broad',
            requirements: 'requisito obrigatório',
            size: 'small',
            independence: 'high',
            organizationId: organization.id
        });

        expect(pet.id).toEqual(expect.any(String)); 
    });

    it('should not be able to create pet without the organization', async () => {
        
        await expect(() => 
             sut.execute({
                name: 'Pet 1',
                about: 'pet de teste',
                age: 'child',
                energy: 'high',
                environment: 'broad',
                requirements: 'requisito obrigatório',
                size: 'small',
                independence: 'high',
                organizationId: 'no-exists-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
