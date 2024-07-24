import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { DetailsPetUseCaseRequest, DetailsPetUseCaseResponse, PetRepository } from "@/interfaces/pet-interfaces";

export class DetailsPetUseCase {
    constructor(private petRepository: PetRepository) {}

    async execute ({ id }: DetailsPetUseCaseRequest): Promise<DetailsPetUseCaseResponse> {
        const pet = await this.petRepository.findById(id);
        if (!pet) throw new ResourceNotFoundError();
        
        return { pet };
    }
}