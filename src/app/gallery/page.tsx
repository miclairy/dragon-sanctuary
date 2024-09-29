import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/gallery/ui/CardSkeleton';
import { DragonList } from '@/app/gallery/ui/DragonList';
import { LIMIT } from '@/app/constants';
import { notFound } from 'next/navigation';

const Gallery = async ({ params }: { params: { page: string } }) => {
    const count = await getDragonCount();
    if (!count) {
        return null;
    }
    const page = parseInt(params.page);

    const dragons = await getCachedDragons(count, page ? (page - 1) * LIMIT : 0);
    if (!dragons || !dragons.length) {
        return notFound();
    }

    return (
        <Suspense fallback={<CardSkeleton />}>
            <DragonList initialDragons={dragons} count={count} />
        </Suspense>
    );
};

export default Gallery;