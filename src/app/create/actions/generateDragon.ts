'use server';

import { Prisma } from '.prisma/client';
import logger from '../../../../pino/logger';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { defaultImage } from '@/app/constants';
import { createDragon } from '@/app/create/actions/createDragon';
import { BREATH } from '@/app/create/creationSteps';
import DragonCreateInput = Prisma.DragonCreateInput;

const openai = new OpenAI();

const whatDoesItBreathe = (breathesFire: boolean, breathesWater: boolean) => {
    if (breathesFire && breathesWater) {
        return BREATH.STEAM;
    } else if (breathesFire) {
        return BREATH.FIRE;
    } else if (breathesWater) {
        return BREATH.WATER;
    }
    return BREATH.NONE;
};

const boolToText = (value: boolean) => {
    return value ? 'there are' : 'there are not any';
};

const prompt = ({
    color,
    eyeColor,
    legs,
    fireBreather,
    waterBreather,
    horns,
    fins,
    wings,
    feathers,
    terrain,
}: DragonCreateInput) =>
    `a realistic ${color} dragon with ${legs} legs that breathes ${whatDoesItBreathe(fireBreather, waterBreather)}, they have ${eyeColor} colored eyes and ${horns} horns and ${boolToText(fins)} fins and ${boolToText(feathers)} feathers and ${boolToText(wings)} wings. It lives in the ${terrain}`;

const generateImage = async (dragon: DragonCreateInput) => {
    if (process.env.NODE_ENV !== 'development' && process.env.MOCK_OPENAI === 'false') {
        try {
            const response = await openai.images.generate({
                model: 'dall-e-3',
                prompt: prompt(dragon),
                size: '1024x1024',
                quality: 'standard',
                n: 1,
            });
            return response.data[0].url;
        } catch (e) {
            logger.error(e);
            throw new Error('Generation Error: Failed to create dragon');
        }
    } else {
        return defaultImage;
    }
};

export const generateDragon = async (dragon: DragonCreateInput) => {
    const imageKey = uuidv4();
    try {
        const [url] = await Promise.all([generateImage(dragon), createDragon(dragon, imageKey)]);
        return { imageKey, url };
    } catch (e) {
        throw e;
    }
};