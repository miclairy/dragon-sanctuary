import type { Metadata } from 'next';
import '@/app/ui/globals.css';
import { joseFinSans } from '@/app/ui/fonts';
import { Navigation } from '@/app/ui/Navigation';
import { Footer } from '@/app/ui/Footer';
import { CloudHeader } from '@/app/ui/CloudHeader';

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
                    <CloudHeader />
                    <Navigation />
                </header>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}