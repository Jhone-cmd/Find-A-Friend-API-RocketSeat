import { PetRepository } from "@/interfaces/pet-interfaces";
import {  Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryPetRepository implements PetRepository {

    public pets: Pet[] = [];

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            size: data.size,
            energy: data.energy,
            requirements: data.requirements,
            environment: data.environment,
            independence: data.independence,
            photos: data.photos ?? null,
            organizationId: data.organizationId
        }
        this.pets.push(pet);
        return pet;
    }
}