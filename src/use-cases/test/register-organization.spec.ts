import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterOrganizationUseCase } from "../register-organization";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { compare } from "bcryptjs";

let organizationRepository: InMemoryOrganizationRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {

    beforeEach(() => {
        
        organizationRepository = new InMemoryOrganizationRepository();
        sut = new RegisterOrganizationUseCase(organizationRepository);
    });

    it('should register an organization', async () => {
        const { organization } = await sut.execute({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            password: '123456',
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        expect(organization.id).toEqual(expect.any(String));
    });

    it('should not be able to register organization with same email twice', async () => {
        await sut.execute({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            password: '123456',
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        await expect(() => 
            sut.execute({
                responsibleName: 'Owner 1',
                name: 'Organization 1',
                email: 'organizationAdmin@email.com',
                password: '123456',
                cep: '00000000',
                address: 'rua nada',
                city: 'Recife',
                state: 'PB',
                phone: '99 99999999',
                latitude: -16.0366592,
                longitude: -48.0509952
            })
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    });

    it('should hash user password upon registration', async () => {
        const { organization } = await sut.execute({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            password: '123456',
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        const isPasswordCorrectlyHashed = await compare('123456', organization.passwordHash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});
