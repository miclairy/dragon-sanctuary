'use client';

import Link from 'next/link';
import { GALLERY } from '@/app/constants';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-2xl py-4 text-center">The search party was called but nothing was found!</h2>
            <Link className="mt-4 rounded-md bg-purple px-4 py-2 text-lg text-white " href={GALLERY}>
                Wanna see some dragons instead?
            </Link>
        </main>
    );
}