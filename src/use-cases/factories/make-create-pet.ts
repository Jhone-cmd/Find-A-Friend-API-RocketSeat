import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { PrismaImageRepository } from "@/repositories/prisma/prisma-image-repository";

export function makeCreatePetUseCase() {
    const petRepository = new PrismaPetRepository();
    const organizationRepository = new PrismaOrganizationRepository();
    const imageRepository = new PrismaImageRepository()
    const useCase = new CreatePetUseCase(petRepository, organizationRepository, imageRepository);
    return useCase;
}