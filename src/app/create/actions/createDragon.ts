import prisma from '@/lib/db';
import { Dragon, Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import { GALLERY } from '@/app/constants';
import logger from '../../../../pino/logger';
import DragonCreateInput = Prisma.DragonCreateInput;

export const createDragon = async (data: DragonCreateInput, imageKey: string) => {
    try {
        await prisma.dragon.create({
            data: {
                ...data,
                slug: data.name.replace(/\s+/g, '-').toLowerCase(),
                horns: data.horns,
                legs: data.legs,
                imageKey,
            } as Dragon,
        });
        revalidatePath(GALLERY);
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to create dragon');
    }
};