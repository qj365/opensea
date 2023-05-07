import Link from 'next/link';
import CardContainer from '../components/explore-collections/CardContainer';
import Tab from '../components/explore-collections/Tab';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import client from '../graphql/apollo-client';
import { GET_COLLECTIONS_FOR_DISPLAY } from '../graphql/query';
import CardHorizontal from '../components/common/CardHorizontal';

const categories = [
    {
        id: 'art',
        title: 'Art',
        link: '?tab=art',
    },
    {
        id: 'gamming',
        title: 'Gamming',
        link: '?tab=gamming',
    },
    {
        id: 'pfp',
        title: 'PFP',
        link: '?tab=pfp',
    },
    {
        id: 'music',
        title: 'Music',
        link: '?tab=music',
    },
    {
        id: 'photography',
        title: 'Photography',
        link: '?tab=photography',
    },
    {
        id: 'sports',
        title: 'Sports',
        link: '?tab=sports',
    },
];

export default function ExploreCollections({ tab: tabServer, collections }) {
    console.log(collections);
    return (
        <div className="w-[1280px] flex flex-col items-center mx-auto">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-[40px] font-semibold text-center mt-[67px] mb-[27px]">
                    Explore Collections
                </h1>
                <div className="text-sm font-medium text-center text-[#8a939b] mt-[30px]">
                    <ul className="flex flex-wrap -mb-px">
                        {categories.map(category => (
                            <li className="mr-2" key={category.id}>
                                <Link href={category.link}>
                                    <a
                                        className={`inline-block p-4 text-base font-semibold ${
                                            tabServer !== category.id
                                                ? 'hover:text-white transition ease-in-out duration-400'
                                                : 'text-[#e5e8eb] border-b-[3px] border-[#2081e2]'
                                        }`}
                                    >
                                        {category.title}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className="w-full border-[#3d474d] mb-10" />
            <div className="w-full grid grid-cols-4 gap-4">
                {collections.map((collection, index) => (
                    <CardHorizontal key={index} {...collection} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { tab } = context.query;
    const { data } = await client.query({
        query: GET_COLLECTIONS_FOR_DISPLAY,
        variables: {
            query: `category=${
                tab?.replace(/^\w/, c => c.toUpperCase()) || 'Art'
            }`,
        },
        fetchPolicy: 'network-only',
    });
    console.log(data);
    return {
        props: {
            tab: tab || 'art',
            collections: data.getAllCollections,
        },
    };
}
