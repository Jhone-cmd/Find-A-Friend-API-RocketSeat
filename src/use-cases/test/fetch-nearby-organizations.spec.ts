import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterOrganizationUseCase } from "../register-organization";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { compare } from "bcryptjs";
import { FetchNearbyOrganizationsUseCase } from "../fetch-nearby-organizations";

let organizationRepository: InMemoryOrganizationRepository;
let sut: FetchNearbyOrganizationsUseCase;

describe('Fetch Nearby Organizations Use Case', () => {

    beforeEach(() => {
        
        organizationRepository = new InMemoryOrganizationRepository();
        sut = new FetchNearbyOrganizationsUseCase(organizationRepository);
    });

    it('should be able to fetch nearby organizations', async () => {
        await organizationRepository.create({
            responsibleName: 'Owner 1',
            name: 'Organization Near',
            email: 'organizationAdmin@email.com',
            passwordHash: '123456',
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        await organizationRepository.create({
            responsibleName: 'Owner 1',
            name: 'Organization Far',
            email: 'organizationAdmin@email.com',
            passwordHash: '123456',
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -15.5560727,
            longitude: -47.9912768
        })

        const { organizations } = await sut.execute({
            userLatitude: -16.0366592,
            userLongitude: -48.0509952
        })
        

        expect(organizations).toHaveLength(1);
        expect(organizations).toEqual([
            expect.objectContaining({ name: 'Organization Near' })
        ])
    });
});
