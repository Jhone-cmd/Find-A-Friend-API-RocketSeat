import { Organization, Pet, Prisma } from "@prisma/client";

export interface OrganizationRepository {
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
    findByEmail(email: string): Promise <Organization | null>;
    findById(id: string): Promise <Organization | null>;
}

export interface RegisterOrganizationUseCaseRequest {
    responsibleName: string,
    email: string,
    password: string,
    cep: string,
    address: string,
    city: string,
    state: string,
    phone: string
}  

export interface RegisterOrganizationUseCaseResponse {
    organization: Organization
}

export interface AuthenticateOrganizationUseCaseRequest {
    email: string,
    password: string
}

export interface AuthenticateOrganizationUseCaseResponse {
    organization: Organization
}