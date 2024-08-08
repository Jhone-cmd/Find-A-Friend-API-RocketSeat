import { OrganizationRepository } from "@/interfaces/organization-interfaces";
import { FiltersPets, PetRepository } from "@/interfaces/pet-interfaces";
import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { InMemoryOrganizationRepository } from "./in-memory-organization-repository";

export class InMemoryPetRepository implements PetRepository {

    public pets: Pet[] = [];

    constructor(private organizationRepository: InMemoryOrganizationRepository) {}

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            photos: data.photos ?? null,
            ...data
        }
        this.pets.push(pet);
        return pet;
    }

    async findByManyPets(query: FiltersPets) {
        
        const organizationByCity = this.organizationRepository.organizations
            .filter((item) => item.city === query.city);

        const pet = this.pets
            .filter((item) => organizationByCity.some((organization) => organization.id === item.organizationId))
            .filter((item) => (query.age ? item.age === query.age : true))
            .filter((item) => (query.size ? item.size === query.size : true))
            .filter((item) => (query.energy ? item.energy === query.energy : true))
            .filter((item) => (query.independence ? item.independence === query.independence : true))
            .filter((item) => (query.environment ? item.environment === query.environment : true))
            //.slice((page - 1) * 20, page * 20);

        return pet;
    }

    async findById(id: string) {
        const pet = this.pets.find((item) => item.id === id);
        if (!pet) return null;

        return pet;
    }
}