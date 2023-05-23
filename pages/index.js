/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import Link from 'next/link';
import Footer from '../components/layout/Footer';
import { useContext, useEffect } from 'react';
import { SidebarContext } from '../context/sidebar-context';

const categories = [
    {
        id: 0,
        name: 'Art',
        href: '/explore-collections?tab=art',
        img: 'https://opensea.io/static/images/categories/art.png',
    },
    {
        id: 1,
        name: 'Gamming',
        href: '/explore-collections?tab=gamming',
        img: 'https://opensea.io/static/images/categories/collectibles.png',
    },
    {
        id: 2,
        name: 'PFP',
        href: '/explore-collections?tab=pfp',
        img: 'https://opensea.io/static/images/categories/domain-names.png',
    },
    {
        id: 3,
        name: 'Music',
        href: '/explore-collections?tab=music',
        img: 'https://opensea.io/static/images/categories/music.png',
    },
    {
        id: 4,
        name: 'Photography',
        href: '/explore-collections?tab=photography',
        img: 'https://opensea.io/static/images/categories/photography-category.png',
    },
    {
        id: 5,
        name: 'Sports',
        href: '/explore-collections?tab=sport',
        img: 'https://opensea.io/static/images/categories/sports.png',
    },
];

export default function Home() {
    const { sidebarIsVisible, hideSidebar } = useContext(SidebarContext);
    useEffect(() => {
        if (sidebarIsVisible) {
            hideSidebar();
        }
    }, []);

    return (
        <div>
            <div className="relative mb-28">
                <div className="before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ww-PqtSiBG7aCNk4lAqw-ibenlcLKdmqsoCXenDDDagM2W9rQHoDVVzAoQBe9QQhElfy44G5u77ujePfWL8WtUkV05f_bAo6BR7Q=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur">
                    <div className="container mx-auto ">
                        <div className="flex h-[525px] relative justify-center flex-wrap items-center">
                            <div className="w-1/2">
                                <div className="relative text-white text-[46px] font-semibold">
                                    Discover, collect, and sell extraordinary
                                    NFTs
                                </div>
                                <div className="text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]">
                                    OpenSea is the world&apos;s first and
                                    largest NFT marketplace
                                </div>
                                <div className="flex">
                                    <Link href={'/explore-collections'}>
                                        <a className="relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer">
                                            Explore
                                        </a>
                                    </Link>

                                    <Link href={'/assets/create'}>
                                        <a className="relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer">
                                            Create
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="h-[450px] w-[450px] rounded-[3rem]">
                                <img
                                    className="rounded-t-lg"
                                    src="https://lh3.googleusercontent.com/ww-PqtSiBG7aCNk4lAqw-ibenlcLKdmqsoCXenDDDagM2W9rQHoDVVzAoQBe9QQhElfy44G5u77ujePfWL8WtUkV05f_bAo6BR7Q=s550"
                                    alt=""
                                />
                                <div className="h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white">
                                    <img
                                        className="h-[2.25rem] rounded-full"
                                        src="https://cloudflare-ipfs.com/ipfs/QmWvvdi6WCnbE9tebZQYRu9Fr1j86SEaE9J253Xw5Jm3As/7ed181433ee09174f09a0e31b563d313.jpg"
                                        alt=""
                                    />
                                    <div className="flex flex-col justify-center ml-4">
                                        <div>Account 1</div>
                                        <a
                                            className="text-[#1868b7]"
                                            href="https://marketplace.quangnn.tech/assets/0xaf98ea9f1c2eb2218d5304a15418267e3bb2b2f9/1"
                                        >
                                            Siren
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto ">
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-2xl font-semibold ">
                        Browse by category
                    </h2>
                    <div className="flex justify-evenly flex-wrap m-[50px] w-3/4 gap-y-12">
                        {categories.map(category => {
                            return (
                                <div className="w-[30%] h-64" key={category.id}>
                                    <Link href={category.href}>
                                        <a>
                                            <div className="w-full h-full rounded-[10px] overflow-hidden shadow-lg">
                                                <div className="w-full h-[75%] relative">
                                                    <Image
                                                        src={category.img}
                                                        alt={category.name}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>

                                                <div className=" p-[20px] bg-[#303339]">
                                                    <div className="text-center text-white font-bold text-xl">
                                                        {category.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return (
        <>
            <OnlyHeaderLayout>{page}</OnlyHeaderLayout>
            <Footer />
        </>
    );
};
