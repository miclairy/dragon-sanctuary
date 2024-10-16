import Image from 'next/image';
import Link from 'next/link';
import { alegreya } from '@/app/ui/fonts';

export const CloudHeader = () => {
    return (
        <div className="flex gap-2 items-center place-content-center pt-4 group overflow-x-hidden max-w-screen">
            <Image
                src="cloud.svg"
                width={200}
                height={50}
                alt="fluffy cloud"
                className="-z-10 lg:z-0 absolute opacity-75 lg:mr-60 mr-20 -rotate-6 duration-700 ease-in-out transition transform group-hover:translate-y-1  group-hover:-translate-x-28 group-hover:-rotate-12 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
            />
            <Link href="/">
                <h1 className={`${alegreya.className} text-4xl py-4 text-center text-purpleDark z-10`}>
                    Dragon Sanctuary
                </h1>
            </Link>
            <Image
                src="cloud.svg"
                width={225}
                height={50}
                alt="fluffy cloud"
                className="-z-10 lg:z-0 absolute opacity-75 lg:ml-60 ml-16 rotate-6 duration-700 ease-in-out transition transform group-hover:translate-y-1  group-hover:translate-x-28 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
            />
        </div>
    );
};