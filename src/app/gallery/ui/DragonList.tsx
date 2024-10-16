'use client';
import { DisplayDragon } from '@/app/gallery/model';
import { getCachedDragons } from '@/app/gallery/actions/getCached';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/app/gallery/ui/Card';
import { LIMIT } from '@/app/constants';
import { Terrain } from '@/app/create/creationSteps';

interface Props {
    initialDragons: DisplayDragon[];
    count: number;
    initialSkip: number;
    terrain?: Terrain;
}

export const DragonList = ({ initialDragons, count, initialSkip, terrain }: Props) => {
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
        <div className="lg:mx-20 p-2 rounded-lg mb-10 ">
            <div className="flex flex-wrap justify-center gap-6 pt-4">
                {dragons.map((dragon) => (
                    <Card {...dragon} key={dragon.id}></Card>
                ))}
            </div>
            {!terrain && count > dragons.length + initialSkip - LIMIT && (
                <div ref={ref} className="text-center p-2">
                    More fire power below....
                </div>
            )}
        </div>
    );
};