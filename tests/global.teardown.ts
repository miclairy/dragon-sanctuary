import { FullConfig } from '@playwright/test';
import { PrismaClient } from '@/generated/prisma/client';
import { testDragon } from './global.setup';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });
const prisma = new PrismaClient({ adapter });

async function globalTeardown(_config: FullConfig) {
    await prisma.dragon.deleteMany({
        where: { name: testDragon.name },
    });
}

export default globalTeardown;