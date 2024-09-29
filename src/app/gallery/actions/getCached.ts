'use server';
import prisma from '@/lib/db';
import { unstable_cache as cache } from 'next/cache';
import logger from '../../../../pino/logger';
import { LIMIT } from '@/app/constants';

export const getCachedDragons = cache(async (cursorIndex?: number, skip = 0) => {
    try {
        return await prisma.dragon.findMany({
            take: LIMIT,
            skip,
            cursor: {
                index: cursorIndex,
            },
            orderBy: {
                index: 'desc',
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
        throw new Error('Database Error: Failed to get dragons');
    }
});

export const getDragonCount = async () => {
    try {
        return prisma.dragon.count();
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to count dragons');
    }
};