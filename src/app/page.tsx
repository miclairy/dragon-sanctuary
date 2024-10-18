import { TerrainDragons } from '@/(Sanctuary)/TerrainDragons';
import { TERRAIN } from '@/app/create/creationSteps';

export default function Home() {
    return (
        <div>
            <div
                style={{ backgroundImage: `url(/mountains.svg)` }}
                className="  lg:bg-contain bg-cover bg-center bg-repeat-x mt-8 min-h-[500px]  "
            >
                <TerrainDragons filter={TERRAIN.mountain} />
            </div>
            <div
                style={{ backgroundImage: `url(/forest.svg)` }}
                className="  lg:bg-contain bg-cover bg-top bg-repeat-x min-h-[500px]  "
            >
                <TerrainDragons filter={TERRAIN.forest} />
            </div>
            <div
                style={{ backgroundImage: `url(/meadow.svg)` }}
                className="  lg:bg-contain bg-cover bg-top bg-repeat-x min-h-[500px]  "
            >
                <TerrainDragons filter={TERRAIN.meadow} />
            </div>
            <div
                style={{ backgroundImage: `url(/lake.svg)` }}
                className="  lg:bg-contain bg-cover bg-top bg-repeat-x min-h-[500px]  "
            >
                <TerrainDragons filter={TERRAIN.lake} />
            </div>
            <div
                style={{ backgroundImage: `url(/sea.svg)` }}
                className="  lg:bg-contain bg-cover bg-top bg-repeat-x min-h-[500px]  "
            >
                <TerrainDragons filter={TERRAIN.sea} />
            </div>

            {/*<Image src="/purpleDragon.png" alt="dragons Flying" width={224} height={224} priority />*/}
        </div>
    );
}