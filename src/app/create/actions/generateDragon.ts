'use server';

import prisma from '@/lib/db';
import { Dragon, Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import logger from '../../../../pino/logger';
import OpenAI from 'openai';
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

const boolToText = (value: string) => {
    return value ? 'there are' : 'there are not any';
};

export const generateDragon = async (dragon: DragonCreateInput) => {
    if (process.env.MOCK_OPENAPI !== 'true') {
        await createDragon(dragon);
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `a realistic ${dragon.color} dragon with ${dragon.legs} legs that breathes ${whatDoesItBreathe(dragon.fireBreather, dragon.waterBreather)}, they have ${dragon.eyeColor} colored eyes and ${dragon.horns} horns and ${boolToText(dragon.fins)} fins and ${boolToText(dragon.feathers)} feathers. It lives in the ${dragon.terrain}`,
            size: '1024x1024',
            quality: 'standard',
            n: 1,
        });
        const imageUrl = response.data[0].url;

        if (imageUrl) {
            return imageUrl;
        }
    }

    return 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-9pMbbb61J0DDJ6qYQu5oefM4/user-K6Ykb8YL2njruV5ShTW872d3/img-A2VGsxelgmUol02RuyjG0Aii.png?st=2024-09-27T17%3A22%3A51Z&se=2024-09-27T19%3A22%3A51Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-27T18%3A22%3A14Z&ske=2024-09-28T18%3A22%3A14Z&sks=b&skv=2024-08-04&sig=kWs39rAbmzUOgi3zZN/yeJgLNbK6c/H1WriO97zGB/s%3D';
};

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