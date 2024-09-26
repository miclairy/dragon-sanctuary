import prisma from '@/lib/db';
import Link from 'next/link';

export default async function Gallery() {
    const dragons = await prisma.dragon.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            slug: true,
            name: true,
            id: true,
        },
    });

    return (
        <div className="lg-mx-20 bg-purple-light p-2 rounded-lg mb-10">
            {dragons.map((dragon) => (
                <Link href={`dragon/${dragon.slug}`} key={dragon.id}>
                    {dragon.name}
                </Link>
            ))}
        </div>
    );
}