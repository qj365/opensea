import React from 'react';
import { useQuery } from '@apollo/client';
import {
    GET_COLLECTION_BY_QUERY,
    COLLECTION_INFO,
} from '../../../graphql/query';
import { useRouter } from 'next/router';
import CollectionImage from '../../../components/collection/CollectionImage';
import Error from 'next/error';
import CollectionList from '../../../components/collection/CollectionList';
import Link from 'next/link';
import ItemsTab from '../../../components/collection/ItemsTab';

const tabs = [
    {
        label: 'Items',
        href: '',
    },
    {
        label: 'Activity',
        href: 'activity',
    },
];
function CollectionPage() {
    const router = useRouter();
    const { data, loading, error } = useQuery(COLLECTION_INFO, {
        variables: {
            slug: router.query?.slug?.toLowerCase(),
        },
        fetchPolicy: 'network-only',
    });

    if (error || (!loading && !data?.getCollectionInfoBySlug))
        return <Error statusCode={404} />;
    if (loading) return <p>Loading...</p>;
    return (
        <>
            <CollectionImage collection={data.getCollectionInfoBySlug} />
            {/* <CollectionList collection={data.getCollectionInfoBySlug} /> */}
            <div className="mt-[-120px] px-8 w-full">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <div key={index}>
                            <Link
                                href={`/collection/${router.query.slug}/${tab.href}`}
                                scroll={false}
                            >
                                <a
                                    className={`text-base font-semibold mr-8 tracking-wide pb-[10px] hover:text-white ${
                                        !router.route.includes('activity') &&
                                        tab.href === ''
                                            ? 'text-white border-b-[3px] border-white'
                                            : 'text-[#8a939b]'
                                    }`}
                                    // onClick={e => handleTabClick(e, tab)}
                                >
                                    {tab.label}
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                <hr className="border-t-0 border-b-[1px] border-[#353840] pt-[10px]" />

                <div>
                    <ItemsTab collection={data.getCollectionInfoBySlug} />
                </div>
            </div>
        </>
    );
}

export default CollectionPage;
