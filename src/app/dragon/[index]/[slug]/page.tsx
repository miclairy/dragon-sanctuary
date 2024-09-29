import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';
import { getDragon } from '@/app/dragon/actions/getDragon';

export default async function DragonDetail({ params }: { params: { index: string } }) {
    const dragon = await getDragon(params.index);

    if (!dragon) {
        return notFound();
    }

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className="text-2xl p-4">{dragon.name}</h2>
            {dragon.imageKey && (
                <Image
                    priority
                    src={`${s3BucketUrl}${dragon.imageKey}.png`}
                    width="1024"
                    height="1024"
                    alt={dragon.name}
                    className="rounded-2xl"
                />
            )}
        </div>
    );
}