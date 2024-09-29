'use client';

import { CreateDragonFrom } from '@/app/create/ui/CreateDragonFrom';

export default function Create() {
    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className="text-2xl pb-2"> Create a dragon </h2>
            <h3 className="text-xl">
                Do you love dragons? Use this free dragon maker to make your very own dragons and other beautiful
                monsters. ❤️
            </h3>
            <p>Powered By openAI</p>
            <CreateDragonFrom />
        </div>
    );
}