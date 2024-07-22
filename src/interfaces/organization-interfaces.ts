import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
    findByEmail(email: string): Promise <Organization | null>;
}

export interface RegisterOrganizationRequest {
    name: string,
    email: string,
    password: string,
    cep: string,
    address: string,
    phone: string
}  

export interface RegisterOrganizationResponse {
    organization: Organization
}

export interface AuthenticateOrganizationRequest {
    email: string,
    password: string
}

export interface AuthenticateOrganizationResponse {
    organization: Organization
}