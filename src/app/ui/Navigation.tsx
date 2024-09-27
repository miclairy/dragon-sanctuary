'use client';

import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface NavLink extends LinkProps {
    key: string;
    title: string;
}

const NavLinks: NavLink[] = [
    {
        key: 'create',
        href: '/create',
        title: 'Create a Dragon',
    },
    {
        key: 'about',
        href: '/about',
        title: 'About',
    },
    {
        key: 'gallery',
        href: '/gallery',
        title: 'Sanctuary',
    },
];

export const Navigation = () => {
    const pathName = usePathname();
    return (
        <div className="flex gap-2 items-center place-content-center">
            {NavLinks.map((link) => (
                <Link
                    key={link.key}
                    href={link.href}
                    className={clsx('rounded-t-lg text-xl text-pink hover:text-purple p-1', {
                        'bg-purpleLight': pathName === link.href,
                    })}
                >
                    {link.title}
                </Link>
            ))}
        </div>
    );
};