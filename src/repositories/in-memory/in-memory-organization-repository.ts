import { OrganizationRepository } from "@/interfaces/organization-interfaces";
import { Prisma, Organization } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {

    public organizations: Organization[] = [];

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            cep: data.cep,
            address: data.address,
            phone: data.phone,
            createdAt: new Date(),
        }

        this.organizations.push(organization);
        return organization;
    }

    async findByEmail(email: string) {
        const organization = this.organizations.find(item => item.email === email);
        if (!organization) return null;

        return organization;
    }
}