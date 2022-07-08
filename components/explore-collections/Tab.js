import Link from 'next/link';

const categories = [
    {
        id: 0,
        title: 'Trending',
        link: '?tab=trending',
    },
    {
        id: 1,
        title: 'Top',
        link: '?tab=top',
    },
    {
        id: 2,
        title: 'Art',
        link: '?tab=art',
    },
    {
        id: 3,
        title: 'Collectibles',
        link: '?tab=collectibles',
    },
    {
        id: 4,
        title: 'Domain Names',
        link: '?tab=domain-names',
    },
    {
        id: 5,
        title: 'Music',
        link: '?tab=music',
    },
    {
        id: 6,
        title: 'Photography',
        link: '?tab=photography',
    },
    {
        id: 7,
        title: 'Sports',
        link: '?tab=sports',
    },
];

function Tab() {
    return (
        <div className="text-sm font-medium text-center text-[#8a939b] mt-[30px]">
            <ul className="flex flex-wrap -mb-px">
                {categories.map(category => (
                    <li className="mr-2" key={category.id}>
                        <Link href={category.link}>
                            <a
                                className="inline-block p-4 text-base font-semibold hover:text-white 
                            transition ease-in-out duration-400"
                            >
                                {category.title}
                            </a>
                        </Link>
                    </li>
                ))}

                <li className="mr-2">
                    <a
                        href="#"
                        className="inline-block p-4 rounded-t-lg border-b-[3px]  active text-[#e5e8eb] border-[#2081e2]"
                        aria-current="page"
                    >
                        Dashboard
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Tab;
