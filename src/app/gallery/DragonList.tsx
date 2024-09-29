'use client';
import { Card } from '@/app/gallery/Card';
import { DisplayDragon } from '@/app/gallery/model';
import { getCachedDragons } from '@/app/gallery/actions/getCached';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const DragonList = ({ initialDragons }: { initialDragons: DisplayDragon[] }) => {
    const [dragons, setDragons] = useState(initialDragons);
    const { ref, inView } = useInView();

    const loadNext = useCallback(async () => {
        const cursorIndex = dragons[dragons.length - 1].index + 1;
        const newSet = await getCachedDragons(cursorIndex);
        if (!!newSet) {
            setDragons([...dragons, ...newSet]);
        }
    }, [dragons]);

    useEffect(() => {
        if (inView) {
            void loadNext();
        }
    }, [loadNext, inView]);

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            {dragons.map((dragon) => (
                <Card {...dragon} key={dragon.id}></Card>
            ))}
            <div ref={ref}> More fire power below....</div>
        </div>
    );
};