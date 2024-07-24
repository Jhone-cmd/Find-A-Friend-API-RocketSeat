import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { AuthenticateOrganizationUseCase } from "../authenticate-organization";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

let organizationRepository: InMemoryOrganizationRepository;
let sut: AuthenticateOrganizationUseCase;

describe('Authenticate Organization Use Case', () => {

    beforeEach(async () => {
        
        organizationRepository = new InMemoryOrganizationRepository();
        sut = new AuthenticateOrganizationUseCase(organizationRepository);
        
        await organizationRepository.create({
            responsibleName: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash('123456', 6),
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999'
        });
    });

    it('should be able to authenticate', async () => {
        
        const { organization } = await sut.execute({
            email: 'organizationAdmin@email.com',
            password: '123456'
        });

        expect(organization.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => {
        
        await expect(() => 
            sut.execute({
                email: 'organizationAdmin2@email.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await expect(() => 
            sut.execute({
                email: 'organizationAdmin@email.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
