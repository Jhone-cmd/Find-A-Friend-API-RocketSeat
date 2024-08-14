import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findByName(name: string): Promise<Pet  | null>;
    findByManyPets(query: FiltersPets, page: number): Promise<Pet[]>;
    findById(id: string): Promise<Pet | null>;
}

export interface FiltersPets {
    city: string,
    age?: string,
    type?: string,
    size?: string,
    energy?: string,
    independence?: string,
    environment?: string,
}

export interface FilePath {
    url: string | null
}
export interface CreatePetUseCaseRequest {
    name: string,
    about: string,
    age: string,
    type: string,
    size: string,
    environment: string,
    energy: string,
    independence: string,
    organizationId: string,
    requirements: string,
    images: FilePath[],
    photo: string | null 
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
    type?: string,
    size?: string,
    energy?: string,
    independence?: string,
    environment?: string,
    page: number
}

export interface ListPetsUseCaseResponse {
    pets: Pet[]
}