/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const categories = [
    {
        id: 0,
        name: 'Art',
        href: '/',
        img: 'https://opensea.io/static/images/categories/art.png',
    },
    {
        id: 1,
        name: 'Collectibles',
        href: '/',
        img: 'https://opensea.io/static/images/categories/collectibles.png',
    },
    {
        id: 2,
        name: 'Domain Names',
        href: '/',
        img: 'https://opensea.io/static/images/categories/domain-names.png',
    },
    {
        id: 3,
        name: 'Music',
        href: '/',
        img: 'https://opensea.io/static/images/categories/music.png',
    },
    {
        id: 4,
        name: 'Photography',
        href: '/',
        img: 'https://opensea.io/static/images/categories/photography-category.png',
    },
    {
        id: 5,
        name: 'Sports',
        href: '/',
        img: 'https://opensea.io/static/images/categories/sports.png',
    },
];

function BrowsePage() {
    return (
        <div className="container mx-auto ">
            <div className="flex flex-col items-center">
                <h2 className="text-white text-2xl font-semibold ">
                    Browse by category
                </h2>
                <div className="flex justify-evenly flex-wrap m-[50px] w-3/4 gap-y-12">
                    {categories.map(category => {
                        return (
                            <div className="w-[30%]" key={category.id}>
                                <Link href={category.href}>
                                    <a>
                                        <div className=" rounded-[10px] overflow-hidden shadow-lg">
                                            <img
                                                className="w-full"
                                                src={category.img}
                                                alt={category.name}
                                            />
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
    );
}

export default BrowsePage;
