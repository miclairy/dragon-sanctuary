'use client';

import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';
import clsx from 'clsx';
import { CardProps } from '@/app/ui/DragonList';
import { FC } from 'react';

export const PhotoCard: FC<CardProps> = ({ index, slug, imageKey, name }: CardProps) => {
    const width = 300;
    const height = 300;

    return (
        <Link
            href={`/dragon/${index}/${slug}`}
            className={clsx('rounded-sm inline-block bg-white p-4 shadow-md ] ', {
                'rotate-[-2deg]': index % 2 === 0,
                'rotate-[3deg]': index % 2 !== 0,
                'translate-x-[-5px]': index % 3 === 0,
                'translate-y-[5px]': index % 3 !== 0,
            })}
        >
            {imageKey && (
                <ImageWithFallback
                    src={`${s3BucketUrl}${imageKey}.png`}
                    width={width}
                    height={height}
                    alt={`Small image of the dragon ${name}`}
                    className="rounded"
                />
            )}
            <p className="text-center text-gray-700 text-lg ">{name}</p>
        </Link>
    );
};