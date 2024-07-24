import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { ListPetsUseCase } from "../list-pets";

let petRepository: InMemoryPetRepository;
let sut: ListPetsUseCase;

describe('List Pets Use Case', () => {

    beforeEach(() => {        
        petRepository = new InMemoryPetRepository();        
        sut = new ListPetsUseCase(petRepository);
    });

    it('should be able to list pets', async () => {
        
        for(let i = 1; i <= 22; i++) {
            await petRepository.create({
                name: `Pet ${i}`,
                about: 'pet de teste',
                age: 'child',
                energy: 'high',
                environment: 'broad',
                requirements: 'requisito obrigatório',
                size: 'small',
                independence: 'high',
                organizationId: 'org-1'
            });
    
        }
        
        const { pets } = await sut.execute({
            organizationId: 'org-1',
            page: 2,
        });

        expect(pets).toEqual([
            expect.objectContaining({ name: 'Pet 21' }),
            expect.objectContaining({ name: 'Pet 22' })
        ]); 
    });

    it('should not be able to list pets', async () => {

        const { pets } = await sut.execute({
            organizationId: 'no-existing-id',
            page: 1,
        });

        expect(pets).toEqual([]);
    });
});
