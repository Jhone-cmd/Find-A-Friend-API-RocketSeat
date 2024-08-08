import { FiltersPets, PetRepository } from "@/interfaces/pet-interfaces";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetRepository {

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data
        });

        return pet;
    }

    async findByManyPets(query: FiltersPets) {
        
        const pets = await prisma.pet.findMany({
            where: { 
                age: query.age,
                size: query.size,
                energy: query.energy,
                environment: query.environment,
                organization: {
                    city: {
                        contains: query.city,
                        mode: 'insensitive'
                    }
                }
            }
        });
    
        return pets;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: { id }
        });
        if (!pet) return null;

        return pet;
    }
}