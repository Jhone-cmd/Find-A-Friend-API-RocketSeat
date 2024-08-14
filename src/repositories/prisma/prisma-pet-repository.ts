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

    async findByManyPets(query: FiltersPets, page: number) {
        
        const pets = await prisma.pet.findMany({
            where: { 
                age: query.age,
                type: query.type,
                size: query.size,
                energy: query.energy,
                environment: query.environment,
                organization: {
                    city: {
                        contains: query.city,
                        mode: 'insensitive'
                    },
                }
            },
            take: 20,
            skip: (page - 1) * 20
        });
    
        return pets;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                about: true,
                age: true,
                type: true,
                size: true,
                energy: true,
                independence: true,
                environment: true,
                photo: true,
                organizationId: true,
                organization: {
                    select: { 
                        phone: true
                    }
                }
            }
            
        });
        if (!pet) return null;

        return pet;
    }

    async findByName(name: string) {
        const pet = await prisma.pet.findFirst({
            where: { name }
        });
        if (!pet) return null;

        return pet;
    }
}