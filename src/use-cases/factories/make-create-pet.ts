import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";

export function makeCreatePetUseCase() {
    const petRepository = new PrismaPetRepository();
    const organizationRepository = new PrismaOrganizationRepository();
    const useCase = new CreatePetUseCase(petRepository, organizationRepository);
    return useCase;
}