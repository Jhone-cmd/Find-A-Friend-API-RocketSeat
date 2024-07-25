import { EmailAlreadyExistsError } from "@/errors/email-already-exists-error";
import { OrganizationRepository, RegisterOrganizationUseCaseRequest, RegisterOrganizationUseCaseResponse } from "@/interfaces/organization-interfaces";
import { hash } from "bcryptjs";

export class RegisterOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute({ responsibleName, name, email, password, cep, address, city, state, phone, latitude, longitude }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
        
        const passwordHash = await hash(password, 6);

        const organizationWithSameEmail = await this.organizationRepository.findByEmail(email);

        if (organizationWithSameEmail) throw new EmailAlreadyExistsError();

        const organization = await this.organizationRepository.create({
            responsibleName, name, email, passwordHash, cep, address, city, state, phone, latitude, longitude 
        });

        return { organization };
    }
}