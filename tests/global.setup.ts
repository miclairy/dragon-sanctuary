import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });
const prisma = new PrismaClient({ adapter });
export const testDragon = {
    name: 'TestDrogon',
    slug: 'testDrogon',
    color: 'purple',
    terrain: 'forest',
    fireBreather: true,
    waterBreather: false,
    eyeColor: 'blue',
    armored: true,
    horns: 2,
    fins: false,
    feathers: false,
    wings: true,
    legs: 4,
    imageKey: '2cf12c4b-cd89-4a3c-84c1-a033fa415231',
};

async function globalSetup() {
    await prisma.dragon.create({
        data: testDragon,
    });
}

export default globalSetup;