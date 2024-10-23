import { CardSkeleton } from '@/app/gallery/ui/CardSkeleton';
import { DragonList } from '@/app/gallery/ui/DragonList';
import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Suspense } from 'react';
import { Terrain } from '@/app/create/creationSteps';
import { capitalize } from '@/app/dragon/textUtils';
import { alegreya } from '@/app/ui/fonts';

export const TerrainDragons = async ({ filter }: { filter: Terrain }) => {
    const count = await getDragonCount(filter);
    if (!count) {
        return null;
    }

    const dragons = await getCachedDragons(filter, 0);

    return (
        <Suspense fallback={<CardSkeleton />}>
            <h2 className={`${alegreya.className} text-3xl mx-2 lg:mx-20 text-purple`}>
                {' '}
                Last seen hiding in the {capitalize(filter)}
            </h2>
            <DragonList initialDragons={dragons} terrain={filter} count={count} initialSkip={dragons.length} />
        </Suspense>
    );
};