import { InvalidRequestError } from "@/errors/invalid-request-error";
import { PetNameAlreadyExistsError } from "@/errors/pet-name-already-exists-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ImageRepository } from "@/interfaces/image-interfaces";
import { OrganizationRepository } from "@/interfaces/organization-interfaces";
import { CreatePetUseCaseRequest, CreatePetUseCaseResponse, PetRepository } from "@/interfaces/pet-interfaces";

export class CreatePetUseCase {
    constructor(private petRepository: PetRepository, 
                private organizationRepository: OrganizationRepository,
                private imageRepository: ImageRepository) {}

    async execute({ name, about, age, type, size, energy, environment, independence, requirements, organizationId, images, photo }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        
        const organization = await this.organizationRepository.findById(organizationId);
        if (!organization) throw new ResourceNotFoundError();

        const petWithSameName = await this.petRepository.findByName(name);
        if (petWithSameName) throw new PetNameAlreadyExistsError();

        const noImages = !images || images.length === 0;
        if (noImages) throw new InvalidRequestError();
        const petPhoto = images ? images[0].url : null;
        
        const pet = await this.petRepository.create({
            name, about, age, type, size, energy, 
            environment, independence, requirements, organizationId: organization.id,
            photo: petPhoto
        });

        for(const image of images) {
            if(image.url) {
                await this.imageRepository.create({
                    url: image.url,
                    petId: pet.id
                });
            } else {
                throw new InvalidRequestError();
            }
        }

        return { pet }
    }
}