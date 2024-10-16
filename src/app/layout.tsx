import type { Metadata } from 'next';
import '@/app/ui/globals.css';
import { alegreya, joseFinSans } from '@/app/ui/fonts';
import { Navigation } from '@/app/ui/Navigation';
import { Footer } from '@/app/ui/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Dragon Sanctuary',
    description: 'Together we protect these beautiful creatures',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${joseFinSans.className} h-screen flex flex-col antialiased bg-gradient-to-r from-blueLight to-pinkLight`}
            >
                <header>
                    <div className="flex gap-2 items-center place-content-center pt-4 group overflow-x-hidden max-w-screen">
                        <Image
                            src="cloud.svg"
                            width={200}
                            height={50}
                            alt="fluffy cloud"
                            className="absolute opacity-75 mr-60 -rotate-6 duration-700 ease-in-out transition transform group-hover:translate-y-1  group-hover:-translate-x-28 group-hover:-rotate-12 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                        />
                        <Link href="/">
                            <h1 className={`${alegreya.className} text-4xl py-4 text-center text-purpleDark `}>
                                Dragon Sanctuary
                            </h1>
                        </Link>
                        <Image
                            src="cloud.svg"
                            width={225}
                            height={50}
                            alt="fluffy cloud"
                            className="absolute opacity-75 ml-60 rotate-6 duration-700 ease-in-out transition transform group-hover:translate-y-1  group-hover:translate-x-28 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                        />
                    </div>

                    <Navigation />
                </header>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}