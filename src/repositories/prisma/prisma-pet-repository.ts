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
        
        const organizationByCity = await prisma.organization.findFirst({
            where: { city: query.city }
        });

        const pet = await prisma.pet.findMany({
            where: { 
                organizationId: organizationByCity?.id,
                OR: [
                    { age: query.age },
                    { size: query.size },
                    { energy: query.energy },
                    { independence: query.independence},
                    { environment: query.environment }
                ]
            }
        });
    
        return pet;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: { id }
        });
        if (!pet) return null;

        return pet;
    }
}