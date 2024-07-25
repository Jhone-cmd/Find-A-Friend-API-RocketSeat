import { Organization, Pet, Prisma } from "@prisma/client";

export interface OrganizationRepository {
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
    findByEmail(email: string): Promise <Organization | null>;
    findById(id: string): Promise <Organization | null>;
    fetchNearbyOrganizations(params: FilterParamsNearbyOrganizations): Promise<Organization[]>;
}

export interface FilterParamsNearbyOrganizations {
    latitude: number;
    longitude: number;
}

export interface RegisterOrganizationUseCaseRequest {
    responsibleName: string,
    name: string,
    email: string,
    password: string,
    cep: string,
    address: string,
    city: string,
    state: string,
    phone: string, 
    latitude: number,
    longitude: number
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

export interface FetchNearbyOrganizationsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

export interface FetchNearbyOrganizationsUseCaseResponse {
    organizations: Organization[]
}