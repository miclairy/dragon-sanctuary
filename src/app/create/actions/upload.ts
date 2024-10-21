'use server';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import logger from '../../../../pino/logger';

const s3Client = new S3({
    region: 'eu-north-1',
});
const Bucket = process.env.AWS_BUCKET;

export const upload = async (imageKey: string, url: string) => {
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