'use client';

import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Rainbow } from '@/app/ui/Rainbow';

interface NavLink extends LinkProps {
    key: string;
    title: string;
}

const NavLinks: NavLink[] = [
    {
        key: 'create',
        href: '/create',
        title: 'Create',
    },
    {
        key: 'about',
        href: '/about',
        title: 'About',
    },
    {
        key: 'gallery',
        href: '/gallery',
        title: 'Gallery',
    },
];

export const Navigation = () => {
    const pathName = usePathname();
    return (
        <nav className="pt-8 flex  items-center place-content-center">
            {NavLinks.map(({ key, href, title }) => (
                <div key={key}>
                    <div className="absolute ml-[1rem] lg:-mt-9 -mt-7 ">{pathName === href && <Rainbow />}</div>
                    <Link
                        key={key}
                        href={href}
                        style={{ backgroundImage: `url(/cloud.svg)` }}
                        className={clsx(
                            'p-5 lg:p-8 bg-no-repeat bg-contain bg-center rounded-t-lg text-xl text-pinkDark hover:text-purple  opacity-75',
                        )}
                    >
                        {title}
                    </Link>
                </div>
            ))}
        </nav>
    );
};