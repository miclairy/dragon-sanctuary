import { getCachedDragons, getDragonCount } from '@/app/gallery/actions/getCached';
import { Terrain } from '@/app/create/creationSteps';
import { capitalize } from '@/app/dragon/textUtils';
import { alegreya } from '@/app/ui/fonts';
import { DragonList } from '@/app/ui/DragonList';
import { PeekabooCard } from '@/(Sanctuary)/PeekabooCard';

export const TerrainDragons = async ({ filter }: { filter: Terrain }) => {
    const count = await getDragonCount(filter);
    if (!count) {
        return null;
    }

    const dragons = await getCachedDragons(filter, 0);

    return (
        <div>
            <h2 className={`${alegreya.className} text-3xl mx-2 lg:mx-20 text-purple`}>
                Last seen hiding in the {capitalize(filter)}
            </h2>
            <DragonList
                initialDragons={dragons}
                terrain={filter}
                count={count}
                initialSkip={dragons.length}
                Card={PeekabooCard}
            />
        </div>
    );
};