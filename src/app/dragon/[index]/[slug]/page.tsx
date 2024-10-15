import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';
import { getDragon } from '@/app/dragon/actions/getDragon';
import { alegreya } from '@/app/ui/fonts';
import { Breeds, LEGS } from '@/app/create/creationSteps';

export default async function DragonDetail({ params }: { params: { index: string } }) {
    const dragon = await getDragon(params.index);

    if (!dragon) {
        return notFound();
    }

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className={`text-3xl pt-4 ${alegreya.className}`}>{dragon.name}</h2>
            <h3 className={`text-xl italic ${alegreya.className}`}>
                {dragon.terrain} {LEGS[dragon.legs as Breeds]}
            </h3>{' '}
            {dragon.imageKey && (
                <Image
                    priority
                    src={`${s3BucketUrl}${dragon.imageKey}.png`}
                    width="1024"
                    height="1024"
                    alt={dragon.name}
                    className="border-white border-solid border-4 shadow mt-2"
                    style={{ transform: 'rotate(1deg)' }}
                />
            )}
            <ul className="m-2">
                <li> Color: {dragon.color}</li>
                <li> Eye Color: {dragon.eyeColor}</li>
                <li> Breathes Fire: {dragon.fireBreather}</li>
                <li> Shoots Water: {dragon.waterBreather}</li>
                <li> Armor: {dragon.armored}</li>
                <li> Horns: {dragon.horns}</li>
                <li> Fins: {dragon.fins} </li>
                <li> Feathers: {dragon.feathers} </li>
                <li> Wings: {dragon.wings}</li>
                <li> Leg No.: {dragon.legs}</li>
                <li> Discovered: {dragon.createdAt.toString()}</li>
            </ul>
        </div>
    );
}