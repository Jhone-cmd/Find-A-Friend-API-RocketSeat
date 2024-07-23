import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

export interface CreatePetUseCaseRequest {
    name: string,
    about: string,
    age: string,
    size: string,
    environment: string,
    requirements: string,
    energy: string,
    independence: string,
    organizationId: string,
}

export interface CreatePetUseCaseResponse {
    pet: Pet
}