import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { OrganizationRepository } from "@/interfaces/organization-interfaces";
import { CreatePetUseCaseRequest, CreatePetUseCaseResponse, PetRepository } from "@/interfaces/pet-interfaces";

export class CreatePetUseCase {
    constructor(private petRepository: PetRepository, private organizationRepository: OrganizationRepository) {}

    async execute({ name, about, age, size, energy, environment, independence, requirements, organizationId }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        
        const organization = await this.organizationRepository.findById(organizationId);
        if (!organization) throw new ResourceNotFoundError();
        
        const pet = await this.petRepository.create({
            name, about, age, size, energy, 
            environment, independence, requirements, organizationId: organization.id
        });

        return { pet }
    }
}