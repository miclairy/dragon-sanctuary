import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { DisplayDragon } from '@/app/gallery/model';

export const Card = ({ index, slug, imageKey, name }: DisplayDragon) => {
    return (
        <div>
            <Link href={`dragon/${index}/${slug}`}>
                {name}
                {imageKey && <Image src={`${s3BucketUrl}${imageKey}.png`} width="1024" height="1024" alt={name} />}
            </Link>
        </div>
    );
};