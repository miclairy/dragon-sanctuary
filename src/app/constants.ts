export const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET;

export const s3BucketUrl = `https://${BUCKET}.s3.eu-north-1.amazonaws.com/`;

export const LIMIT = 4;

export const GALLERY = '/gallery';

export const defaultImage =
    'https://dragon-images.s3.eu-north-1.amazonaws.com/12221e3f-6f35-4dbb-b072-2648c2671f1c.png';
