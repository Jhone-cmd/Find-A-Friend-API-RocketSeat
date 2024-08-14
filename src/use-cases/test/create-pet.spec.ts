import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { PetNameAlreadyExistsError } from "@/errors/pet-name-already-exists-error";
import { InvalidRequestError } from "@/errors/invalid-request-error";
import { InMemoryImageRepository } from "@/repositories/in-memory/in-memory-image-repository";
import { InMemoryRequirementRepository } from "@/repositories/in-memory/in-memory-requirement-repository";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let imageRepository: InMemoryImageRepository;
let requirementRepository: InMemoryRequirementRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {

    beforeEach(() => {        
        organizationRepository = new InMemoryOrganizationRepository();
        imageRepository = new InMemoryImageRepository();
        requirementRepository = new InMemoryRequirementRepository();
        petRepository = new InMemoryPetRepository(organizationRepository);
        sut = new CreatePetUseCase(petRepository, organizationRepository, imageRepository, requirementRepository);
    });

    it('should be able to create pet', async () => {
        const organization = await organizationRepository.create({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash('123456', 6),
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });    

        const images = [
            {
                id: "1",
                url: 'https://example.com/image1.jpg',
            },
            {
                id: "2",
                url: 'https://example.com/image2.jpg',
            }
        ]

        const { pet } = await sut.execute({
            name: 'Pet 1',
            about: 'pet de teste',
            age: 'child',
            type: 'dog',
            energy: 'high',
            environment: 'broad',
            requirements: JSON.stringify(['Requisito 1', 'Requisito 2']),
            size: 'small',
            independence: 'high',
            organizationId: organization.id,
            images,
            photo: null
        });

        expect(pet.id).toEqual(expect.any(String)); 
    });

    it('should not be able to create pet without the organization', async () => {
        
        await expect(() => 
             sut.execute({
                name: 'Pet 1',
                about: 'pet de teste',
                age: 'child',
                type: 'dog',
                energy: 'high',
                environment: 'broad',
                requirements: JSON.stringify(['Requisito 1', 'Requisito 2']),
                size: 'small',
                independence: 'high',
                images: [],
                photo: null,
                organizationId: 'no-exists-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should be able to create pet with same name twice', async () => {
        const organization = await organizationRepository.create({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash('123456', 6),
            cep: '00000000',
            address: 'rua nada',
            city: 'Recife',
            state: 'PB',
            phone: '99 99999999',
            latitude: -16.0366592,
            longitude: -48.0509952
        });

        const images = [
            {
                id: "1",
                url: 'https://example.com/image1.jpg',
            },
            {
                id: "2",
                url: 'https://example.com/image2.jpg',
            }
        ]

        await  sut.execute({
            name: 'Pet 1',
            about: 'pet de teste',
            age: 'child',
            type: 'dog',
            energy: 'high',
            environment: 'broad',
            requirements: JSON.stringify(['Requisito 1', 'Requisito 2']),
            size: 'small',
            independence: 'high',
            organizationId: organization.id,
            images,
            photo: null
        })

        await expect(() => 
            sut.execute({
                name: 'Pet 1',
                about: 'pet de teste',
                age: 'child',
                type: 'dog',
                energy: 'high',
                environment: 'broad',
                requirements: JSON.stringify(['Requisito 1', 'Requisito 2']),
                size: 'small',
                independence: 'high',
                organizationId: organization.id,
                images,
                photo: null
            })
        ).rejects.toBeInstanceOf(PetNameAlreadyExistsError);
    });

    it.skip('should not be able to create pet without images', async () => {
        const organization = await organizationRepository.create({
            responsibleName: 'Owner 1',
            name: 'Organization 1',
            email: 'organizationAdmin@email.com',
            passwordHash: await hash('123456', 6),
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
                name: 'Pet 1',
                about: 'pet de teste',
                age: 'child',
                type: 'dog',
                energy: 'high',
                environment: 'broad',
                requirements: '',
                size: 'small',
                independence: 'high',
                images: [],
                photo: null,
                organizationId: organization.id
            })
        ).rejects.toBeInstanceOf(InvalidRequestError);
    });
});
