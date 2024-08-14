import { RequirementRepository } from "@/interfaces/requirement-interfaces";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaRequirementRepository implements RequirementRepository {

    async create(data: Prisma.RequirementUncheckedCreateInput) {
        const requirement = await prisma.requirement.create({
            data
        });
        return requirement;
    }
}
