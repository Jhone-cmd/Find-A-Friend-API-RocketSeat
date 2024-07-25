import { FetchNearbyOrganizationsUseCaseRequest, FetchNearbyOrganizationsUseCaseResponse, OrganizationRepository } from "@/interfaces/organization-interfaces";

export class FetchNearbyOrganizationsUseCase {
    constructor(private organizationRepository: OrganizationRepository) {}

    async execute({ userLatitude, userLongitude }: FetchNearbyOrganizationsUseCaseRequest): Promise<FetchNearbyOrganizationsUseCaseResponse> {
        const organizations = await this.organizationRepository.fetchNearbyOrganizations({
            latitude: userLatitude,
            longitude: userLongitude,
        });

        return { organizations }
    }
}