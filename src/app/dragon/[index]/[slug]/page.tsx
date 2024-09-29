import prisma from '@/lib/db';
import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';

export default async function DragonDetail({ params }: { params: { index: string; slug: string } }) {
    const dragon = await prisma.dragon.findUnique({
        where: { index: parseInt(params.index) },
    });

    if (!dragon) {
        return notFound();
    }

    return (
        <div className="lg-mx-20 bg-purple-light p-2 rounded-lg mb-10">
            <p>{dragon.name}</p>
            {dragon.imageKey && (
                <Image
                    priority
                    src={`${s3BucketUrl}${dragon.imageKey}.png`}
                    width="1024"
                    height="1024"
                    alt={dragon.name}
                />
            )}
        </div>
    );
}