'use server';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import logger from '../../../../pino/logger';
import { Dragon, Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { BUCKET, GALLERY } from '@/app/constants';
import { v4 as uuidv4 } from 'uuid';
import DragonCreateInput = Prisma.DragonCreateInput;

const s3Client = new S3({
    region: 'eu-north-1',
});

const upload = async (imageKey: string, svg: string) => {
    try {

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: `${imageKey}.svg`,
            Body: svg,
            ContentType: 'image/svg+xml',
        });
        const response = await s3Client.send(command);
        logger.info({ response }, 'Uploaded to S3');
    } catch (err) {
        logger.error(err);
        throw new Error('Upload Error: Failed to push dragon image', { cause: err });
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
        throw new Error('Database Error: Failed to create dragon', { cause: e });
    }
};

export const saveDragon = async (svg: string, dragon: DragonCreateInput) => {
    const imageKey = uuidv4();
    await Promise.all([upload(imageKey, svg), createDragon(dragon, imageKey)]);
};