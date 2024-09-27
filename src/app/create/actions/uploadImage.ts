'use server';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import logger from '../../../../pino/logger';

const s3Client = new S3({
    // signature: 's3v4',
    region: 'eu-north-1',
});
const Bucket = 'dragon-images';

export const upload = async (imageKey: string, url: string) => {
    try {
        const imageResponse = await fetch(url);
        const buffer = Buffer.from(await imageResponse.arrayBuffer());

        const command = new PutObjectCommand({
            Bucket,
            Key: imageKey,
            Body: buffer,
            // ContentEncoding: 'base64',
            ContentType: 'image/png',
        });
        const response = await s3Client.send(command);
        logger.info(`Uploaded to S3: ${response}`);
    } catch (err) {
        logger.error(err);
    }
};