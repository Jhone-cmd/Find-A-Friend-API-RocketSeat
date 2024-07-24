import { ListPetsUseCaseRequest, ListPetsUseCaseResponse, PetRepository } from "@/interfaces/pet-interfaces";

export class ListPetsUseCase {
    constructor (private petRepository: PetRepository) {}

    async execute({ organizationId, page }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {

        const pets = await this.petRepository.findByManyPets(organizationId, page);
        return { pets }
    }
}