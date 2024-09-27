import prisma from '@/lib/db';
import { unstable_cache as cache } from 'next/cache';

export const getCachedDragons = cache(async () =>
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
    }),
);