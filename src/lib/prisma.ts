import { env } from "@/env/schema";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});