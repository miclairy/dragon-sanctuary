import { TerrainDragons } from '@/(Sanctuary)/TerrainDragons';
import { TERRAIN } from '@/app/create/creationSteps';

export default function Home() {
    return (
        <div className="mt-8">
            {Object.values(TERRAIN).map((terrain) => {
                return (
                    <div
                        key={terrain}
                        style={{ backgroundImage: `url(/backdrops/${terrain}.svg)` }}
                        className="lg:bg-contain bg-center bg-cover  bg-repeat-x min-h-[500px]  "
                    >
                        <TerrainDragons filter={terrain} />
                    </div>
                );
            })}
        </div>
    );
}