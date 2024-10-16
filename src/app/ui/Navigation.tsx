'use client';

import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Rainbow } from '@/app/ui/Rainbow';

interface NavLink extends LinkProps {
    key: string;
    title: string;
    offset: string;
}

const NavLinks: NavLink[] = [
    {
        key: 'create',
        href: '/create',
        title: 'Create a Dragon',
        offset: '5rem',
    },
    {
        key: 'about',
        href: '/about',
        title: 'About',
        offset: '1rem',
    },
    {
        key: 'gallery',
        href: '/gallery',
        title: 'Gallery',
        offset: '1rem',
    },
];

export const Navigation = () => {
    const pathName = usePathname();
    return (
        <nav className="pt-8 flex gap-2 items-center place-content-center">
            {NavLinks.map(({ offset, key, href, title }) => (
                <div key={key}>
                    <div className={`absolute ml-[${offset}] -mt-9`}>{pathName === href && <Rainbow />}</div>
                    <Link
                        key={key}
                        href={href}
                        style={{ backgroundImage: `url(/cloud.svg)` }}
                        className={clsx(
                            'p-8 bg-no-repeat bg-contain bg-center rounded-t-lg text-xl text-pinkDark hover:text-purple  opacity-75',
                        )}
                    >
                        {title}
                    </Link>
                </div>
            ))}
        </nav>
    );
};