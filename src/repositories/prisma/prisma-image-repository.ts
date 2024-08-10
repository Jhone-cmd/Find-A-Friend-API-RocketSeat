import { ImageRepository } from "@/interfaces/image-interfaces";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaImageRepository implements ImageRepository {

    async create(data: Prisma.ImageUncheckedCreateInput) {
        const image = await prisma.image.create({
            data
        });
        return image;

    }
}