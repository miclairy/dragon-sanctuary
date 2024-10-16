import type { Metadata } from 'next';
import '@/app/ui/globals.css';
import { alegreya, joseFinSans } from '@/app/ui/fonts';
import { Navigation } from '@/app/ui/Navigation';
import { Footer } from '@/app/ui/Footer';
import Link from 'next/link';

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
                    <Link href="/">
                        <h1 className={`${alegreya.className} text-4xl p-4 text-center text-purpleDark`}>
                            Dragon Sanctuary
                        </h1>
                    </Link>

                    <Navigation />
                </header>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}