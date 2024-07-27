import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetDetailsPetUseCase } from "../get-details-pet";

export function makeGetDetailsPetUseCase() {
    const petRepository = new PrismaPetRepository();
    const useCase = new GetDetailsPetUseCase(petRepository);
    return useCase;
}