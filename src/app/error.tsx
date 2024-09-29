'use client';

import { useEffect } from 'react';
import logger from '../../pino/logger';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        logger.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-2xl py-4 text-center ">This needs more testing!</h2>
            <button
                className="mt-4 rounded-md bg-purple px-4 py-2 text-sm text-white transition-colors hover:bg-purple-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Wanna try again?
            </button>
        </main>
    );
}