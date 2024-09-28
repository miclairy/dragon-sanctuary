'use server';

import prisma from '@/lib/db';
import { Dragon, Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import logger from '../../../../pino/logger';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { upload } from '@/app/create/actions/uploadImage';
import DragonCreateInput = Prisma.DragonCreateInput;

const openai = new OpenAI();

const Breath = {
    WATER: 'water',
    FIRE: 'fire',
    STEAM: 'steam',
    NONE: 'nothing',
} as const;

const whatDoesItBreathe = (breathesFire: boolean, breathesWater: boolean) => {
    if (breathesFire && breathesWater) {
        return Breath.STEAM;
    } else if (breathesFire) {
        return Breath.FIRE;
    } else if (breathesWater) {
        return Breath.WATER;
    }
    return Breath.NONE;
};

const boolToText = (value: boolean) => {
    return value ? 'there are' : 'there are not any';
};

export const generateDragon = async (dragon: DragonCreateInput) => {
    const imageKey = uuidv4();
    await createDragon(dragon, imageKey);
    let imageUrl = null;
    if (process.env.MOCK_OPENAPI !== 'true') {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `a realistic ${dragon.color} dragon with ${dragon.legs} legs that breathes ${whatDoesItBreathe(dragon.fireBreather, dragon.waterBreather)}, they have ${dragon.eyeColor} colored eyes and ${dragon.horns} horns and ${boolToText(dragon.fins)} fins and ${boolToText(dragon.feathers)} feathers. It lives in the ${dragon.terrain}`,
            size: '1024x1024',
            quality: 'standard',
            n: 1,
        });
        imageUrl = response.data[0].url;
    } else {
        imageUrl = 'https://dragon-images.s3.eu-north-1.amazonaws.com/2cf12c4b-cd89-4a3c-84c1-a033fa415231.png';
    }

    if (imageUrl) {
        await upload(imageKey, imageUrl);
    }
    return imageUrl;
};

const createDragon = async (data: DragonCreateInput, imageKey: string) => {
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
        revalidatePath('/gallery'); // make urls consts pancake
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