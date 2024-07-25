import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { FetchNearbyOrganizationsUseCase } from "../fetch-nearby-organizations";

export function makeFetchNearbyOrganizationUseCase() {
    const organizationRepository = new PrismaOrganizationRepository();
    const useCase = new FetchNearbyOrganizationsUseCase(organizationRepository);
    return useCase;
}