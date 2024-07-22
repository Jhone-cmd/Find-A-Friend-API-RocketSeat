import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { OrganizationRepository, RegisterOrganizationRequest, RegisterOrganizationResponse } from "@/interfaces/organization-interfaces";
import { hash } from "bcryptjs";

export class RegisterOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute({ name, email, password, cep, address, phone }: RegisterOrganizationRequest): Promise<RegisterOrganizationResponse> {
        
        const passwordHash = await hash(password, 6);

        const organizationWithSameEmail = await this.organizationRepository.findByEmail(email);

        if (organizationWithSameEmail) throw new EmailAlreadyExistsError();

        const organization = await this.organizationRepository.create({
            name, email, passwordHash, cep, address, phone 
        });

        return { organization };
    }
}