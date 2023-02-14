/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import {
    MdOutlineAccountBalanceWallet,
    MdFavoriteBorder,
    MdPerson,
    MdVisibility,
    MdGridOn,
    MdSettings,
    MdLogout,
} from 'react-icons/md';
import SvgLogo from '../../assets/icons/index';
import { useState, useCallback, useContext } from 'react';
import WalletModal from '../common/WalletModal';
import { useAddress } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import AccountSidebar from '../common/AccountSidebar';
import { SidebarContext } from '../../context/sidebar-context';

const categories = [
    {
        id: 0,
        title: 'All NFTs',
        link: '/assets',
        icon: SvgLogo.AllnftsLogo,
    },
    {
        id: 1,
        title: 'Art',
        link: 'category/art',
        icon: SvgLogo.ArtLogo,
    },
    {
        id: 2,
        title: 'Collectibles',
        link: 'category/collectibles',
        icon: SvgLogo.CollectiblesLogo,
    },
    {
        id: 3,
        title: 'Domain Names',
        link: 'category/domain-names',
        icon: SvgLogo.DomainLogo,
    },
    {
        id: 4,
        title: 'Music',
        link: 'category/music',
        icon: SvgLogo.MusicLogo,
    },
    {
        id: 5,
        title: 'Photography',
        link: 'category/photography',
        icon: SvgLogo.PhotographyLogo,
    },
    {
        id: 6,
        title: 'Sports',
        link: 'category/sports',
        icon: SvgLogo.SportsLogo,
    },
];

const stats = [
    {
        id: 0,
        title: 'Rankings',
        link: '/rankings',
    },
    {
        id: 1,
        title: 'Activity',
        link: '/activity',
    },
];

const resources = [
    {
        id: 0,
        title: 'Help Center',
        link: '/',
    },
    {
        id: 1,
        title: 'Plaform Status',
        link: '/',
    },
    {
        id: 2,
        title: 'Gas-Free Marketplace',
        link: '/',
    },
    {
        id: 3,
        title: 'Docs',
        link: '/',
    },
];

const accounts = [
    {
        id: 0,
        title: 'Profile',
        link: '/profile',
        icon: <MdPerson className="text-2xl text-[#8a939b]" />,
    },
    {
        id: 1,
        title: 'Favorites',
        link: '/favorites',
        icon: <MdFavoriteBorder className="text-2xl text-[#8a939b]" />,
    },
    {
        id: 2,
        title: 'Watchlist',
        link: '/my-watchlist',
        icon: <MdVisibility className="text-2xl text-[#8a939b]" />,
    },
    {
        id: 3,
        title: 'My Collections',
        link: '/collections',
        icon: <MdGridOn className="text-2xl text-[#8a939b]" />,
    },
    {
        id: 4,
        title: 'Settings',
        link: '/account/settings',
        icon: <MdSettings className="text-2xl text-[#8a939b]" />,
    },
];

const style = {
    wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const Header = () => {
    const sidebarContext = useContext(SidebarContext);

    // const [showWalletModal, setShowWalletModal] = useState(false);
    // const handleCloseWalletModal = useCallback(
    //     () => setShowWalletModal(false),
    //     []
    // );
    const address = useAddress();
    // function handleWalletClick() {
    //     if (!address) setShowWalletModal(true);
    // }

    // const [showSidebar, setShowSidebar] = useState(false);
    // const [isVisible, setVisibility] = useState(false);
    // const toggleSidebar = () => {
    //     setShowSidebar(showSidebar => !showSidebar);
    //     document.body.style.overflow =
    //         document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    // };

    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
            </Head>
            <nav className="flex bg-[#04111d] h-[72px] left-0 w-full z-50 fixed top-0">
                <div className="h-full pr-6 px-4">
                    <Link href="/">
                        <a className="flex h-full items-center">
                            <Image
                                src={SvgLogo.OpenseaLogo}
                                height={40}
                                width={40}
                                alt="Logo"
                            />
                            <span className={style.logoText}>Opensea</span>
                        </a>
                    </Link>
                </div>
                <div className=" flex flex-1 h-full items-center">
                    <div className="flex flex-1 h-[45px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]">
                        <div className={style.searchIcon}>
                            <AiOutlineSearch />
                        </div>
                        <input
                            className={style.searchInput}
                            placeholder="Search items, collections, and accounts"
                        />
                    </div>
                </div>
                <ul className="flex">
                    <div className="flex items-center">
                        <li className="h-full group">
                            <Link href="/explore-collections">
                                <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                    Explore
                                </a>
                            </Link>
                            <div className="absolute top-[72px] hidden group-hover:block group-hover:animate-fadein">
                                <ul className="bg-[#353840] rounded-b-[10px] overflow-hidden">
                                    {categories.map(category => (
                                        <li
                                            className="w-[220px] h-14 hover:bg-[#1e2225]
                                        "
                                            style={{
                                                transition:
                                                    'all 0.25s ease-in-out',
                                            }}
                                            key={category.id}
                                        >
                                            <Link href={category.link}>
                                                <a className="flex items-center w-full h-full pl-4 text-[#e5e8eb] text-base font-semibold">
                                                    <img
                                                        className="h-6 w-6 "
                                                        src={category.icon.src}
                                                        alt=""
                                                    />
                                                    <span className="pl-2">
                                                        {category.title}
                                                    </span>
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className="h-full group">
                            <Link href="/">
                                <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                    Stats
                                </a>
                            </Link>
                            <div className="absolute top-[72px] hidden group-hover:block group-hover:animate-fadein">
                                <ul className="bg-[#353840] rounded-b-[10px] overflow-hidden">
                                    {stats.map(stat => (
                                        <li
                                            className="w-[220px] h-14 hover:bg-[#1e2225]
                                        "
                                            style={{
                                                transition:
                                                    'all 0.25s ease-in-out',
                                            }}
                                            key={stat.id}
                                        >
                                            <Link href={stat.link}>
                                                <a className="flex items-center w-full h-full pl-4 text-[#e5e8eb] text-base font-semibold">
                                                    <span className="pl-2">
                                                        {stat.title}
                                                    </span>
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className="h-full group">
                            <Link href="/">
                                <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                    Resources
                                </a>
                            </Link>
                            <div className="absolute top-[72px] hidden group-hover:block group-hover:animate-fadein">
                                <ul className="bg-[#353840] rounded-b-[10px] overflow-hidden">
                                    {resources.map(resource => (
                                        <li
                                            className="w-[230px] h-14 hover:bg-[#1e2225]
                                        "
                                            style={{
                                                transition:
                                                    'all 0.25s ease-in-out',
                                            }}
                                            key={resource.id}
                                        >
                                            <Link href={resource.link}>
                                                <a className="flex items-center w-full h-full pl-4 text-[#e5e8eb] text-base font-semibold">
                                                    <span className="pl-2">
                                                        {resource.title}
                                                    </span>
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className="h-full">
                            <Link href="/">
                                <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                    Create
                                </a>
                            </Link>
                        </li>
                    </div>
                    <div className="flex">
                        <li className="group">
                            <Link href="/">
                                <a className="flex items-center text-3xl h-full px-5 font-bold text-[#8a939b] hover:text-white">
                                    <CgProfile />
                                </a>
                            </Link>
                            <div className="absolute top-[72px] right-[72px] hidden group-hover:block group-hover:animate-fadein">
                                <ul className="bg-[#353840] rounded-b-[10px] overflow-hidden">
                                    {accounts.map(account => (
                                        <li
                                            className="w-[220px] h-14 hover:bg-[#1e2225]
                                        "
                                            style={{
                                                transition:
                                                    'all 0.25s ease-in-out',
                                            }}
                                            key={account.id}
                                        >
                                            <Link href={account.link}>
                                                <a className="flex items-center w-full h-full pl-4 text-[#e5e8eb] text-base font-semibold">
                                                    {account.icon}
                                                    <span className="pl-6">
                                                        {account.title}
                                                    </span>
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button
                                className="text-[32px] h-full px-5 font-bold text-[#8a939b] hover:text-white"
                                onClick={sidebarContext.toggleSidebar}
                            >
                                <MdOutlineAccountBalanceWallet />
                            </button>

                            {/* <WalletModal
                                showWalletModal={showWalletModal}
                                onClose={handleCloseWalletModal}
                            /> */}
                        </li>
                    </div>
                </ul>
            </nav>

            <AccountSidebar />
        </>
    );
};

export default Header;
