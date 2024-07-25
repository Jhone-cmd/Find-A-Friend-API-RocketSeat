import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetDetailsPetUseCase } from "../get-details-pet";

export function makeCreatePetUseCase() {
    const petRepository = new PrismaPetRepository();
    const useCase = new GetDetailsPetUseCase(petRepository);
    return useCase;
}