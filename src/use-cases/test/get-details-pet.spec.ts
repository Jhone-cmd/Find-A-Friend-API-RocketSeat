import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { GetDetailsPetUseCase } from "../get-details-pet";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: GetDetailsPetUseCase;

describe('Create Pet Use Case', () => {

    beforeEach(() => {   
        organizationRepository = new InMemoryOrganizationRepository();
        petRepository = new InMemoryPetRepository(organizationRepository);        
        sut = new GetDetailsPetUseCase(petRepository);
    });

    it('should be able to get a pet', async () => {
        
        const organization = await organizationRepository.create({
            responsibleName: 'Owner 1',
                name: 'Organization 1',
                email: 'organizationAdmin@email.com',
                passwordHash: '123456',
                cep: '00000000',
                address: 'rua nada',
                city: 'Recife',
                state: 'PB',
                phone: '99 99999999',
                latitude: -16.0366592,
                longitude: -48.0509952
        });
        
        const createPet = await petRepository.create({
            name: `Pet 1`,
            about: 'pet de teste',
            age: 'child',
            type: 'dog',
            energy: 'high',
            environment: 'broad',
            requirements: 'requisito obrigatório',
            size: 'small',
            independence: 'high',
            organizationId: organization.id
        });   
        

        const { pet } = await sut.execute({
            id: createPet.id
        });

        expect(pet.id).toEqual(expect.any(String)); 
        expect(pet.name).toEqual('Pet 1')
    });

    it('should not be able to create pet without the organization', async () => {
        
        await expect(() => 
             sut.execute({
                id: 'no-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
