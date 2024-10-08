import { FullConfig } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { testDragon } from './global.setup';

const prisma = new PrismaClient();

async function globalTeardown(_config: FullConfig) {
    await prisma.dragon.deleteMany({
        where: { name: testDragon.name },
    });
}

export default globalTeardown;