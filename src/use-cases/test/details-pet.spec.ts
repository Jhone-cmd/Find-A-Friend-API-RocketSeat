import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { DetailsPetUseCase } from "../details-pet";

let petRepository: InMemoryPetRepository;
let sut: DetailsPetUseCase;

describe('Create Pet Use Case', () => {

    beforeEach(() => {        
        petRepository = new InMemoryPetRepository();        
        sut = new DetailsPetUseCase(petRepository);
    });

    it('should be able to get a pet', async () => {
        
        const createPet = await petRepository.create({
            name: 'Pet 1',
            about: 'pet de teste',
            age: 'child',
            energy: 'high',
            environment: 'broad',
            requirements: 'requisito obrigatório',
            size: 'small',
            independence: 'high',
            organizationId: 'org-1'
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
