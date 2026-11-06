'use client';

import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import { useState } from 'react';
import { GeneratedResult } from '@/app/create/ui/GeneratedResult';

export default function Create() {
    const [svg, setSvg] = useState<string>();

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg flex-1">
            {!svg ? <CreateDragonForm setImageUrl={setSvg} /> : <GeneratedResult svg={svg} />}
        </div>
    );
}