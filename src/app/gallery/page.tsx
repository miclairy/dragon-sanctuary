import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/gallery/ui/CardSkeleton';
import { DragonList } from '@/app/gallery/ui/DragonList';

export default async function Gallery() {
    const dragons = await getCachedDragons(0);
    const count = await getDragonCount();
    if (!dragons || !count) {
        return null;
    }
    return (
        <Suspense fallback={<CardSkeleton />}>
            <DragonList initialDragons={dragons} count={count} />
        </Suspense>
    );
}