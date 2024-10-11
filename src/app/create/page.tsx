'use client';

import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import { useState } from 'react';
import { GeneratedResult } from '@/app/create/ui/GeneratedResult';

export default function Create() {
    const [imageUrl, setImageUrl] = useState<string>();

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg flex-1">
            {!imageUrl && <CreateDragonForm setImageUrl={setImageUrl} />}
            <GeneratedResult imageUrl={imageUrl} />
            <div className="pt-8 text-sm">
                Vectors and icons by
                <a
                    href="https://github.com/nagoshiashumari/Rpg-Awesome?ref=svgrepo.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    Nagoshiashumari
                </a>
                in GPL License via
                <a href="https://www.svgrepo.com/" target="_blank" rel="noreferrer">
                    SVG Repo
                </a>
                and
                <a href="https://game-icons.net/?ref=svgrepo.com" target="_blank" rel="noreferrer">
                    Game Icons.net
                </a>
                in CC Attribution License via{' '}
                <a href="https://www.svgrepo.com/" target="_blank" rel="noreferrer">
                    SVG Repo
                </a>
                <p>Powered By openAI</p>
            </div>
        </div>
    );
}