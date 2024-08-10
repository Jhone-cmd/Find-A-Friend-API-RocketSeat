import { ListPetsUseCaseRequest, ListPetsUseCaseResponse, PetRepository } from "@/interfaces/pet-interfaces";

export class FetchListPetsUseCase {
    constructor (private petRepository: PetRepository) {}

    async execute({ city, size, age, type, energy, independence, environment }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {

        const pets = await this.petRepository.findByManyPets(
            { city, size, age, type, energy, independence, environment } 
        );
        
        return { pets }
    }
}