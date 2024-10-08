'use server';
import prisma from '@/lib/db';
import logger from '../../../../pino/logger';
import { LIMIT } from '@/app/constants';

export const getCachedDragons = async (cursorIndex: number | null, skip = 0) => {
    try {
        return await prisma.dragon.findMany({
            take: LIMIT,
            skip,
            ...(cursorIndex && {
                cursor: {
                    index: cursorIndex,
                },
            }),
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
};

export const getDragonCount = async () => {
    try {
        return prisma.dragon.count();
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to count dragons');
    }
};