'use server';
import prisma from '@/lib/db';
import logger from '../../../../pino/logger';
import { LIMIT } from '@/app/constants';
import { Terrain } from '@/app/create/creationSteps';

export const getCachedDragons = async (terrain?: Terrain | null, skip = 0) => {
    try {
        return await prisma.dragon.findMany({
            take: LIMIT,
            skip,
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
            ...(terrain && {
                where: {
                    terrain: terrain,
                },
            }),
        });
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to get dragons');
    }
};

export const getDragonCount = async (terrain?: Terrain) => {
    try {
        return prisma.dragon.count({
            ...(terrain && {
                where: {
                    terrain: terrain,
                },
            }),
        });
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to count dragons');
    }
};