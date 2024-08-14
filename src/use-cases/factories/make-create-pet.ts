import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { PrismaImageRepository } from "@/repositories/prisma/prisma-image-repository";
import { PrismaRequirementRepository } from "@/repositories/prisma/prisma-requirement-repository";

export function makeCreatePetUseCase() {
    const petRepository = new PrismaPetRepository();
    const organizationRepository = new PrismaOrganizationRepository();
    const imageRepository = new PrismaImageRepository()
    const requirementRepository = new PrismaRequirementRepository();
    const useCase = new CreatePetUseCase(petRepository, organizationRepository, imageRepository, requirementRepository);
    return useCase;
}