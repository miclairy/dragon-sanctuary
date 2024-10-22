import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { DisplayDragon } from '@/app/gallery/model';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';

export const Card = ({ index, slug, imageKey, name }: DisplayDragon) => {
    const width = 200;
    const height = 200;

    return (
        <Link href={`/dragon/${index}/${slug}`} className="p-2 hover:opacity-50">
            <p className="absolute text-lg text-purpleDark bg-blueLight rounded-full mt-4 ml-4 p-1"> {name} </p>
            {imageKey && (
                <ImageWithFallback
                    src={`${s3BucketUrl}${imageKey}.png`}
                    width={width}
                    height={height}
                    alt={`Small image of the dragon ${name}`}
                    className="rounded-full"
                />
            )}
        </Link>
    );
};