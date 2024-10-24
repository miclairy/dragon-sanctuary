import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/gallery/ui/CardSkeleton';
import { LIMIT } from '@/app/constants';
import { notFound } from 'next/navigation';
import { DragonList } from '@/app/ui/DragonList';
import { PhotoCard } from '@/app/gallery/ui/PhotoCard';

const Gallery = async ({ params }: { params: { page: string } }) => {
    const count = await getDragonCount();
    if (!count) {
        return null;
    }
    const page = parseInt(params.page);
    const skip = page ? (page - 1) * LIMIT : 0;

    const dragons = await getCachedDragons(null, skip);
    if (!dragons || !dragons.length) {
        return notFound();
    }

    return (
        <Suspense fallback={<CardSkeleton />}>
            <DragonList initialDragons={dragons} count={count} initialSkip={skip + dragons.length} Card={PhotoCard} />
        </Suspense>
    );
};

export default Gallery;