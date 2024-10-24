import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';
import { getDragon } from '@/app/dragon/actions/getDragon';
import { alegreya } from '@/app/ui/fonts';
import { Breeds, LEGS } from '@/app/create/creationSteps';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';
import { StatsTable } from '@/app/dragon/ui/StatsTable';
import { capitalize, dragonBio } from '@/utils/textUtils';

export default async function DragonDetail({ params }: { params: { index: string } }) {
    const dragon = await getDragon(params.index);

    if (!dragon) {
        return notFound();
    }

    const { name, legs, terrain, imageKey } = dragon;

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className={`text-3xl px-4 mt-2 ${alegreya.className}`}>{name}</h2>
            <h3 className={`text-xl px-4 pb-2 italic ${alegreya.className}`}>
                {capitalize(terrain)} {LEGS[legs as Breeds]}
            </h3>
            <p className="px-4 text-lg center mb-4">{dragonBio(dragon)}</p>

            <div className="lg:flex place-content-center ">
                {imageKey && (
                    <ImageWithFallback
                        priority
                        src={`${s3BucketUrl}${imageKey}.png`}
                        width="800"
                        height="800"
                        alt={name}
                        className="border-white border-solid border-4 shadow m-2 mx-auto"
                        style={{ transform: 'rotate(1deg)' }}
                    />
                )}
                <StatsTable dragon={dragon} />
            </div>
        </div>
    );
}