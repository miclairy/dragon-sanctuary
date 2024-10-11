'use client';

import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import { useState } from 'react';
import { GeneratedResult } from '@/app/create/ui/GeneratedResult';

export default function Create() {
    const [imageUrl, setImageUrl] = useState<string>();

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10 h-screen">
            {!imageUrl && <CreateDragonForm setImageUrl={setImageUrl} />}
            <GeneratedResult imageUrl={imageUrl} />
            <p className="sm:bottom-2 sm:fixed lg:relative lg:mt-8">Powered By openAI</p>
        </div>
    );
}