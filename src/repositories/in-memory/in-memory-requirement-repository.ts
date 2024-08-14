import { RequirementRepository } from "@/interfaces/requirement-interfaces";
import { Prisma, Requirement } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryRequirementRepository implements RequirementRepository {
    public requirements: Requirement[] = [];

    async create(data: Prisma.RequirementUncheckedCreateInput) {
        const requirement = {
            id: randomUUID(),
            ...data
        }
        this.requirements.push(requirement);
        return requirement;
    }
}