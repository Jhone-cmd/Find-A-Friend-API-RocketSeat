import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { AuthenticateOrganizationUseCaseRequest, AuthenticateOrganizationUseCaseResponse, OrganizationRepository } from "@/interfaces/organization-interfaces";
import { compare } from "bcryptjs";

export class AuthenticateOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute({ email, password }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
        
        const organization = await this.organizationRepository.findByEmail(email);

        if (!organization) throw new InvalidCredentialsError();

        const doesPasswordMatch = await compare(password, organization.passwordHash);
        if (!doesPasswordMatch) throw new InvalidCredentialsError();

        return { organization };
    }
}