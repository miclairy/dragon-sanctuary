'use client';
import { DisplayDragon } from '@/app/gallery/model';
import { getCachedDragons } from '@/app/gallery/actions/getCached';
import { FC, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { LIMIT } from '@/app/constants';
import { Terrain } from '@/app/create/creationSteps';

interface Props {
    initialDragons: DisplayDragon[];
    count: number;
    initialSkip: number;
    Card: FC<CardProps>;
    terrain?: Terrain;
}

export interface CardProps extends DisplayDragon {
    terrain?: Terrain;
}

const MAX_RECENT = 8;
export const DragonList = ({ initialDragons, count, initialSkip, terrain, Card }: Props) => {
    const [dragons, setDragons] = useState(initialDragons);
    const [skip, setSkip] = useState(initialSkip);

    const { ref, inView } = useInView();

    const loadNext = useCallback(async () => {
        const newSet = await getCachedDragons(terrain, skip);
        if (!!newSet.length) {
            setDragons([...dragons, ...newSet]);
            setSkip((s) => s + newSet.length);
        }
    }, [dragons, skip, terrain]);

    useEffect(() => {
        if (inView) {
            void loadNext();
        }
    }, [loadNext, inView]);

    // todo : pancake add priority to initial load
    // todo : add image cdn with optimized image sizes
    // todo : convert images to webp
    return (
        <div className="lg:mx-20 p-2 rounded-lg  ">
            <div className="flex flex-wrap justify-center gap-4 pt-4">
                {dragons.map((dragon) => (
                    <Card {...dragon} key={dragon.id} terrain={terrain} />
                ))}
            </div>
            {(terrain
                ? MAX_RECENT > dragons.length && count > dragons.length
                : count > dragons.length + initialSkip - LIMIT) && (
                <div ref={ref} className="text-center p-2">
                    More fire power below....
                </div>
            )}
        </div>
    );
};