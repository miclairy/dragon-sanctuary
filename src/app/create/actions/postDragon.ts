'use server';

import prisma from '@/lib/db';
import { Dragon, Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import logger from '../../../../pino/logger';
import DragonCreateInput = Prisma.DragonCreateInput;

export const createDragon = async (data: DragonCreateInput) => {
    try {
        await prisma.dragon.create({
            data: {
                ...data,
                slug: data.name.replace(/\s+/g, '-').toLowerCase(),
                horns: data.horns,
                legs: data.legs,
            } as Dragon,
        });
        revalidatePath('/dragons'); // make urls consts pancake
    } catch (e) {
        logger.error(e);
    }
};

export const addImageKey = async (id: string, imageKey: string) => {
    await prisma.dragon.update({
        where: { id },
        data: { imageKey },
    });
};