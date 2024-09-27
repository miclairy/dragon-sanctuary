// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
import { PrismaClient } from '@prisma/client';
import { defaultDragons } from './default-dragons';

const prisma = new PrismaClient();

const main = async () => {
    for (const dragon of defaultDragons) {
        await prisma.dragon.upsert({ update: {}, where: { slug: dragon.slug }, create: dragon });
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e); // pancake todo use a logger
        await prisma.$disconnect();
        process.exit(1);
    });
