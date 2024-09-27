import Link from 'next/link';
import { getCachedDragons } from '@/app/gallery/getCached';

export default async function Gallery() {
    const dragons = await getCachedDragons();

    return (
        <div className="lg-mx-20 bg-purple-light p-2 rounded-lg mb-10">
            {dragons.map((dragon) => (
                <Link href={`dragon/${dragon.slug}`} key={dragon.id}>
                    {dragon.name}
                </Link>
            ))}
        </div>
    );
}