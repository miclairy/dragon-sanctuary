import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { DisplayDragon } from '@/app/gallery/model';
import { useState } from 'react';

export const Card = ({ index, slug, imageKey, name }: DisplayDragon) => {
    const [isHovered, setIsHovered] = useState(false);
    const width = 300;
    const height = 300;

    return (
        <div
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            style={{ width, height }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/dragon/${index}/${slug}`} className="p-2">
                {name} {index}
                {imageKey && (
                    <Image
                        src={`${s3BucketUrl}${imageKey}.png`}
                        width={width}
                        height={height}
                        alt={name}
                        className="rounded-xl border-solid-purple"
                    />
                )}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-purple-500 to-pink-500 transition-opacity duration-300 ${
                        isHovered ? 'opacity-70' : 'opacity-0'
                    }`}
                />
            </Link>
        </div>
    );
};