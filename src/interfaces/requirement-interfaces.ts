import { Prisma, Requirement } from "@prisma/client";

export interface RequirementRepository {
    create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>;
}