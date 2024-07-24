import { OrganizationRepository } from "@/interfaces/organization-interfaces";
import { Prisma, Organization } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {

    public organizations: Organization[] = [];

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = {
            id: randomUUID(),
            responsibleName: data.responsibleName,
            email: data.email,
            passwordHash: data.passwordHash,
            cep: data.cep,
            address: data.address,
            city: data.city,
            state: data.state,
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

    async findById(id: string) {
        const organization = this.organizations.find(item => item.id === id);
        if (!organization) return null;
        
        return organization;
    }

    // async findByCity(city: string) {
    //     const organizations = this.organizations.filter(item => item.city === city)
    //     return organizations;
    // }
}