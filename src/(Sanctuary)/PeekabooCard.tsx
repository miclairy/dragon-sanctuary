'use client';
import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';
import Image from 'next/image';
import { Terrain } from '@/app/create/creationSteps';
import clsx from 'clsx';
import { CardProps } from '@/app/ui/DragonList';
import { FC } from 'react';

const terrainImgCover: { [K in Terrain]: string } = {
    forest: 'leaves',
    sea: 'fish',
    lake: 'lakePlant',
    meadow: 'flower',
    mountain: 'cloud',
};

export const PeekabooCard: FC<CardProps> = ({ index, slug, imageKey, name, terrain }: CardProps) => {
    const width = 200;
    const height = 200;

    return (
        <div>
            {terrain && (
                <Image
                    src={`${terrainImgCover[terrain]}.svg`}
                    width={200}
                    height={50}
                    alt={`cartoon ${terrainImgCover[terrain]} partially hiding the dragon`}
                    className="-z-10 z-0 absolute opacity-95 rotate-6 duration-700 ease-in-out transition transform group-hover:translate-y-1  group-hover:translate-x-12 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                />
            )}

            <Link
                href={`/dragon/${index}/${slug}`}
                className="p-2 hover:opacity-85 ease-in-out duration-700 transition transform  group-hover:translate-y-12"
            >
                <p className="absolute text-lg text-purpleDark bg-blueLight rounded-xl mt-2 ml-2 p-1">{name}</p>
                {imageKey && (
                    <ImageWithFallback
                        src={`${s3BucketUrl}${imageKey}.png`}
                        width={width}
                        height={height}
                        alt={`Small image of the dragon ${name}`}
                        className={clsx('', {
                            'rounded-full': terrain,
                            'rounded-xl': !terrain,
                        })}
                    />
                )}
            </Link>
        </div>
    );
};