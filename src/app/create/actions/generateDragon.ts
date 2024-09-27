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
    if (process.env.MOCK_OPENAPI !== 'true') {
        await createDragon(dragon, imageKey);
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `a realistic ${dragon.color} dragon with ${dragon.legs} legs that breathes ${whatDoesItBreathe(dragon.fireBreather, dragon.waterBreather)}, they have ${dragon.eyeColor} colored eyes and ${dragon.horns} horns and ${boolToText(dragon.fins)} fins and ${boolToText(dragon.feathers)} feathers. It lives in the ${dragon.terrain}`,
            size: '1024x1024',
            quality: 'standard',
            n: 1,
        });
        const imageUrl = response.data[0].url;
        if (imageUrl) {
            await upload(imageKey, imageUrl);

            return imageUrl;
        }
    }
    const mockImageUrl =
        'https://dragon-images.s3.eu-north-1.amazonaws.com/0fe174a0-5cf7-4e3e-8aea-6563f7b668cd?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRjBEAiAsF%2FTooaXg0gj6nrOhdc98bV9IDhxE6YyuFUrwl8HoDwIgBc10AGnZ3wHh6TUrLsMrcwlkcHn87zaMXdtHBQ4oV2Qq%2FQIINhAAGgw0ODQ5MDc0OTE4MDgiDMWsjmvcg7rUwgnaYyraAs9WbNyURYCDC9fmypXhllTzuadVi%2BLyOMG2wfNDtdDvbE0r%2By6r%2FvcbCwYdM%2FY2h8u1Hg3S%2B76oULhJbunEsy%2BH1%2FfcQcc0n0SYwcedFUkpddQ293ONFsFLCoku8%2ByY1QpqBdgn%2B2c9X6VW%2BVnNi6HcycdPejG0kiBWT4rd0NCjcveJXWd7w5bhtEEbXTbW%2B%2Bgcp%2Bpn3jpzb4mNWr6vpmXIRjtaewxEIzRRuIfJkSrdH36MVAUPhRuXhGIDGjLL8AHk21E5ruFFyteuMs1e89d%2BooGGofwg5ORtvLQFhNREoQwbpP2Yy3jJXleaHLA5OdfTUtklLYEeybylpZlg6MqRuNcZUh4DvJnCr05NL%2F5PAlcEfx9HtXmCPvN1%2BjqdjpDeVyreu5QaXu%2BQTpTY0ciWP4uMsaI74JUrBREpZAek9%2BvC%2BQwQoncDYFsTLRkqXmVqy4U1YD66ZKIwuazctwY6tALOKSGXuEV20aLpPNrOquEtgm%2FP%2FrBdI%2BSJLIILW8MwRARUW4zcGs9M8ocEy09iKu34wh3ROIcwne%2FnGa%2FPrbiftuoyKpuZOV2z10cvVkl7VrrNqhbAx0kg7K9KN%2BdONtgNM54n6mo%2B5Q4WGdwKq4oo5qZDAe8GPwW5EYsc5a6IiS3ytF8fYekMXdXa7D2h0VxCkfJZ0qOGPjutUO%2Bk8a%2BdKjW1l4FDzV2ovMt4Um2288XuyvHVajHvbjT79sUnfBJ4Y8v0BAL0KkNf65W60KqRcFfSUJIJXCJLh2mFA%2FqKBOa1f%2Bxi%2BOFaIrQbbHa9NaZHVcoeFa%2BhSXOPKdCOkufZUlvQFrvioeZUtbjJSep708qwX6UEzx7EPotfeUUuWXJLJMOXqesyGp3D8nkL9OIeUwww%2Bw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240927T203221Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIAXBZV5EHQND5NIBGV%2F20240927%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=060d7f17982980be1fd05ef2da4bb12c835f961edd4da993a4a7f6c73fa7332d';

    await upload(imageKey, mockImageUrl);

    return mockImageUrl;
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