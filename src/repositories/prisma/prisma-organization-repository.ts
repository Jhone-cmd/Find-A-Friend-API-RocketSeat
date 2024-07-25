import { FilterParamsNearbyOrganizations, OrganizationRepository } from "@/interfaces/organization-interfaces";
import { prisma } from "@/lib/prisma";
import { Prisma, Organization } from "@prisma/client";

export class PrismaOrganizationRepository implements OrganizationRepository {

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = await prisma.organization.create({
            data
        });

        return organization;
    }

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: { email }
        });
        if (!organization) return null;

        return organization;
    }

    async findById(id: string) {
        const organization = await prisma.organization.findUnique({
            where: { id }
        });
        if (!organization) return null;
        
        return organization;
    }

    async fetchNearbyOrganizations(params: FilterParamsNearbyOrganizations) {
        const organizations = await prisma.$queryRaw<Organization[]>`
            Select * from organizations
            WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return organizations;
    }
}