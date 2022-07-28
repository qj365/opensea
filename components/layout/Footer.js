import Image from 'next/image';
import Link from 'next/link';

import openseaWhite from '../../assets/icons/openseaWhite.svg';

const footers = [
    {
        id: 0,
        h3: 'Marketplace',
        links: [
            {
                id: 0,
                name: 'All NFTs',
                href: '/',
            },
            {
                id: 1,
                name: 'Art',
                href: '/',
            },
            {
                id: 2,
                name: 'Collectibles',
                href: '/',
            },
            {
                id: 3,
                name: 'Domain Names',
                href: '/',
            },
            {
                id: 4,
                name: 'Music',
                href: '/',
            },
            {
                id: 5,
                name: 'Photography',
                href: '/',
            },
            {
                id: 6,
                name: 'Sports',
                href: '/',
            },
        ],
    },
    {
        id: 1,
        h3: 'My Account',
        links: [
            {
                id: 0,
                name: 'Profile',
                href: '/',
            },
            {
                id: 1,
                name: 'Favorites',
                href: '/',
            },
            {
                id: 2,
                name: 'My Collections',
                href: '/',
            },
        ],
    },
    {
        id: 2,
        h3: 'Resources',
        links: [
            {
                id: 0,
                name: 'Help Center',
                href: '/',
            },
            {
                id: 1,
                name: 'Platform Status',
                href: '/',
            },
            {
                id: 2,
                name: 'Gas-Free Marketplace',
                href: '/',
            },
            {
                id: 3,
                name: 'Docs',
                href: '/',
            },
        ],
    },
    {
        id: 3,
        h3: 'Company',
        links: [
            {
                id: 0,
                name: 'About',
                href: '/',
            },
            {
                id: 1,
                name: 'Careers',
                href: '/',
            },
        ],
    },
];

function Footer() {
    return (
        <div className="mx-auto bg-[#04111d] py-16">
            <div className="flex mx-auto w-[82.5%] ">
                <div className="flex flex-col basis-1/4 items-start">
                    <Image
                        src={openseaWhite}
                        height={44}
                        width={44}
                        alt="Logo"
                    />
                    <Link href="/">
                        <a className="text-xl text-white font-semibold my-2">
                            OpenSea
                        </a>
                    </Link>
                    <p className="text-base text-white">
                        The world’s first and largest digital marketplace for
                        crypto collectibles and non-fungible tokens (NFTs). Buy,
                        sell, and discover exclusive digital items.
                    </p>
                </div>
                <div className="flex justify-evenly basis-3/4 pl-[72px]">
                    {footers.map(footer => (
                        <div key={footer.id} className="w-1/4">
                            <h3 className="font-semibold text-white my-4">
                                {footer.h3}
                            </h3>
                            <ul>
                                {footer.links.map(link => (
                                    <li
                                        className="mt-3 hover:font-medium"
                                        key={link.id}
                                    >
                                        <Link href={link.href}>
                                            <a className="text-white text-sm">
                                                {link.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;
