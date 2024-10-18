import { CardSkeleton } from '@/app/gallery/ui/CardSkeleton';
import { DragonList } from '@/app/gallery/ui/DragonList';
import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { Terrain } from '@/app/create/creationSteps';

export const TerrainDragons = async ({ filter }: { filter: Terrain }) => {
    const count = await getDragonCount(filter);
    if (!count) {
        return null;
    }

    const dragons = await getCachedDragons(filter, 0);

    return (
        <Suspense fallback={<CardSkeleton />}>
            <DragonList initialDragons={dragons} terrain={filter} count={count} initialSkip={dragons.length} />
        </Suspense>
    );
};