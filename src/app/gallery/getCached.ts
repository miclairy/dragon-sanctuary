import prisma from '@/lib/db';

export const getCachedDragons = async () =>
    prisma.dragon.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            slug: true,
            name: true,
            id: true,
            imageKey: true,
        },
    });