import prisma from '@/lib/db';
import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';

export default async function DragonDetail({ params }: { params: { slug: string } }) {
    const dragon = await prisma.dragon.findUnique({
        where: { slug: params.slug },
    });

    if (!dragon) {
        return null; // pancake make 404 page
    }

    return (
        <div className="lg-mx-20 bg-purple-light p-2 rounded-lg mb-10">
            <p>{dragon.name}</p>
            {dragon.imageKey && (
                <Image src={`${s3BucketUrl}${dragon.imageKey}.png`} width="1024" height="1024" alt={dragon.name} />
            )}
        </div>
    );
}