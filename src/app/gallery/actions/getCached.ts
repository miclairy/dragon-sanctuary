'use server';
import prisma from '@/lib/db';
import { unstable_cache as cache } from 'next/cache';
import logger from '../../../../pino/logger';

const LIMIT = 1;

export const getCachedDragons = cache(async (cursorIndex) => {
    try {
        return await prisma.dragon.findMany({
            take: LIMIT,
            cursor: {
                index: cursorIndex,
            },
            orderBy: {
                index: 'asc',
            },
            select: {
                slug: true,
                name: true,
                id: true,
                imageKey: true,
                index: true,
            },
        });
    } catch (e) {
        logger.error(e);
    }
});

export const getDragonCount = async () => {
    try {
        return prisma.dragon.count();
    } catch (e) {
        logger.error(e);
    }
};