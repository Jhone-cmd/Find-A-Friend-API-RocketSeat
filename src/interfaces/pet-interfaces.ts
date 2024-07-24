import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findByManyPets(query: string, page: number): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>;
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

export interface DetailsPetUseCaseRequest {
    id: string
}

export interface DetailsPetUseCaseResponse {
    pet: Pet
}

export interface ListPetsUseCaseRequest {
    organizationId: string,
    page: number,
}

export interface ListPetsUseCaseResponse {
    pets: Pet[]
}