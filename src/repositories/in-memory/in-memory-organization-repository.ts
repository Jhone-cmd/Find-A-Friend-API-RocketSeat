import { FilterParamsNearbyOrganizations, OrganizationRepository } from "@/interfaces/organization-interfaces";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Prisma, Organization } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {

    public organizations: Organization[] = [];

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = {
            id: randomUUID(),
            responsibleName: data.responsibleName,
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            cep: data.cep,
            address: data.address,
            city: data.city,
            state: data.state,
            phone: data.phone,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            createdAt: new Date(),
        }

        this.organizations.push(organization);
        return organization;
    }

    async findByEmail(email: string) {
        const organization = this.organizations.find((item) => item.email === email);
        if (!organization) return null;

        return organization;
    }

    async findById(id: string) {
        const organization = this.organizations.find((item) => item.id === id);
        if (!organization) return null;
        
        return organization;
    }

    async fetchNearbyOrganizations(params: FilterParamsNearbyOrganizations) {
        const organizations = this.organizations
            .filter((item) => {
                const distance = getDistanceBetweenCoordinates(
                    { latitude: params.latitude, longitude: params.longitude },
                    { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
                )

                return distance < 10;
            })

        return organizations;
    }
}