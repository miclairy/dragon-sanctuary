'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
    fallback?: string;
}

export const ImageWithFallback = ({ fallback = '/purpleDragon.png', alt, src, ...props }: Props) => {
    const [error, setError] = useState<boolean>(false);

    return (
        <Image
            alt={error ? 'fallback image of a purple dragon' : alt}
            onError={() => setError(true)}
            src={error ? fallback : src}
            {...props}
        />
    );
};