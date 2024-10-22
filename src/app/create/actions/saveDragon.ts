'use server';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import logger from '../../../../pino/logger';
import { Dragon, Prisma } from '.prisma/client';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { GALLERY } from '@/app/constants';
import { v4 as uuidv4 } from 'uuid';
import DragonCreateInput = Prisma.DragonCreateInput;

const s3Client = new S3({
    region: 'eu-north-1',
});
const Bucket = process.env.AWS_BUCKET;

const upload = async (imageKey: string, url: string) => {
    try {
        const imageResponse = await fetch(url);
        const buffer = Buffer.from(await imageResponse.arrayBuffer());

        const command = new PutObjectCommand({
            Bucket,
            Key: `${imageKey}.png`,
            Body: buffer,
            ContentType: 'image/png',
        });
        const response = await s3Client.send(command);
        logger.info(`Uploaded to S3: ${response}`);
    } catch (err) {
        logger.error(err);
        throw new Error('Upload Error: Failed to push dragon image');
    }
};

const createDragon = async (data: DragonCreateInput, imageKey: string) => {
    try {
        const result = await prisma.dragon.create({
            data: {
                ...data,
                slug: data.name.replace(/\s+/g, '-').toLowerCase(),
                horns: data.horns,
                legs: data.legs,
                imageKey,
            } as Dragon,
        });
        revalidatePath(GALLERY);
        revalidatePath('/');
        return result.id;
    } catch (e) {
        logger.error(e);
        throw new Error('Database Error: Failed to create dragon');
    }
};

export const saveDragon = async (url: string, dragon: DragonCreateInput) => {
    const imageKey = uuidv4();
    try {
        await Promise.all([upload(imageKey, url), createDragon(dragon, imageKey)]);
    } catch (e) {
        throw e;
    }
};