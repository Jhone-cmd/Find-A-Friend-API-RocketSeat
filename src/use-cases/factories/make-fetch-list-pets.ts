import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FetchListPetsUseCase } from "../fetch-list-pets";

export function makeFetchListPetsUseCase() {
    const petRepository = new PrismaPetRepository();
    const useCase = new FetchListPetsUseCase(petRepository);
    return useCase;
}