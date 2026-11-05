// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@/generated/prisma/client';

import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
    prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaGlobal = prisma;
