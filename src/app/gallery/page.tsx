import { getCachedDragons } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/gallery/CardSkeleton';
import { DragonList } from '@/app/gallery/DragonList';

export default async function Gallery() {
    const dragons = await getCachedDragons(0);
    if (!dragons) {
        return null;
    }
    // TODO: pancake loading the images
    return (
        <Suspense fallback={<CardSkeleton />}>
            <DragonList initialDragons={dragons} />
        </Suspense>
    );
}