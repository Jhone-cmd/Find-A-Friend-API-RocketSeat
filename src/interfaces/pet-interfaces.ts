import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findByManyPets(query: FiltersPets): Promise<Pet[]>;
    findById(id: string): Promise<Pet | null>;
}

export interface FiltersPets {
    city: string,
    age?: string,
    size?: string,
    energy?: string,
    independence?: string,
    environment?: string,
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
    photos: string | null
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
    city: string,
    age?: string,
    size?: string,
    energy?: string,
    independence?: string,
    environment?: string,
}

export interface ListPetsUseCaseResponse {
    pets: Pet[]
}