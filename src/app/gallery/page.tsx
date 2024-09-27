import Link from 'next/link';
import { getCachedDragons } from '@/app/gallery/getCached';
import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';

export default async function Gallery() {
    const dragons = await getCachedDragons();

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            {dragons.map((dragon) => (
                <Link href={`dragon/${dragon.slug}`} key={dragon.id}>
                    {dragon.name}
                    {dragon.imageKey && (
                        <Image
                            src={`${s3BucketUrl}${dragon.imageKey}.png`}
                            width="1024"
                            height="1024"
                            alt={dragon.name}
                        />
                    )}
                </Link>
            ))}
        </div>
    );
}