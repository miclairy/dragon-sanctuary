import Image from 'next/image';
import { MountainDragons } from '@/(Sanctuary)/MountainDragons';

export default function Home() {
    return (
        <div className="">
            <MountainDragons />
            <Image src="/purpleDragon.png" alt="dragons Flying" width={224} height={224} priority />
        </div>
    );
}