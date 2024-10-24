'use client';
import { s3BucketUrl } from '@/app/constants';
import Link from 'next/link';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';
import Image from 'next/image';
import { Terrain } from '@/app/create/creationSteps';
import clsx from 'clsx';
import { CardProps } from '@/app/ui/DragonList';
import { FC, useState } from 'react';

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
    const [hovered, setHovered] = useState(false);

    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Link href={`/dragon/${index}/${slug}`} className="p-1 ">
                {terrain && (
                    <Image
                        src={`${terrainImgCover[terrain]}.svg`}
                        width={width}
                        height={height}
                        alt={`cartoon ${terrainImgCover[terrain]} partially hiding the dragon`}
                        style={{
                            marginTop: '-2em',
                            opacity: '0.95',
                            transitionProperty: 'all',
                            transitionDuration: '700ms',
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            ...(hovered && {
                                translate: '3em -2em',
                                rotate: '-12deg',
                            }),
                        }}
                        className="z-0 absolute"
                    />
                )}

                <p className=" absolute text-lg text-purpleDark bg-blueLight rounded-xl mt-2 ml-2 p-1">{name}</p>
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