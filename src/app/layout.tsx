import type { Metadata } from 'next';
import '@/app/ui/globals.css';
import { alegreya, joseFinSans } from '@/app/ui/fonts';
import { Navigation } from '@/app/ui/Navigation';

export const metadata: Metadata = {
    title: 'Dragon Sanctuary',
    description: 'Create beautiful dragons',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${joseFinSans.className} antialiased bg-gradient-to-r from-blueLight to-pinkLight`}>
                <h1 className={`${alegreya.className} text-5xl p-4 text-center`}>Dragon Sanctuary</h1>
                <Navigation />
                {children}
            </body>
        </html>
    );
}