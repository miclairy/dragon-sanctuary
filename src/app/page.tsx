import { TerrainDragons } from '@/(Sanctuary)/TerrainDragons';
import { TERRAIN } from '@/app/create/creationSteps';

export default function Home() {
    return (
        <div className="">
            <div
                style={{ backgroundImage: `url(/mountainGrey.svg)` }}
                className=" bg-no-repeat bg-contain bg-top mt-4 min-h-[600px]  "
            >
                <TerrainDragons filter={TERRAIN.mountain} />
            </div>
            {/*<TerrainDragons filter={TERRAIN.forest} />*/}
            {/*<TerrainDragons filter={TERRAIN.meadow} />*/}
            {/*<TerrainDragons filter={TERRAIN.lake} />*/}
            {/*<TerrainDragons filter={TERRAIN.sea} />*/}

            {/*<Image src="/purpleDragon.png" alt="dragons Flying" width={224} height={224} priority />*/}
        </div>
    );
}