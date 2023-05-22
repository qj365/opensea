import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
    GET_COLLECTION_BY_QUERY,
    COLLECTION_INFO,
    GET_EVENT_OF_COLLECTION,
} from '../../../graphql/query';
import { useRouter } from 'next/router';
import CollectionImage from '../../../components/collection/CollectionImage';
import Error from 'next/error';
import CollectionList from '../../../components/collection/CollectionList';
import EventCollectionFilter from '../../../components/collection/EventCollectionFilter';
import Link from 'next/link';
import {
    MdAutoAwesome,
    MdCancel,
    MdMultipleStop,
    MdOpenInNew,
    MdSell,
    MdShoppingCart,
} from 'react-icons/md';
import { useAddress } from '@thirdweb-dev/react';
import { Tooltip } from 'flowbite-react';
import { formatToUSDate, timeElapsed } from '../../../utils/formatDate';
import Image from 'next/image';
import { useEffect } from 'react';

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
const options = [
    {
        value: 'Sale',
        label: 'Sale',
        icon: <MdShoppingCart className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Listing',
        label: 'Listing',
        icon: <MdSell className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Offer',
        label: 'Offer',
        icon: <MdMultipleStop className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Mint',
        label: 'Mint',
        icon: <MdAutoAwesome className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Cancel',
        label: 'Cancel',
        icon: <MdCancel className="mr-[10px] text-2xl" />,
    },
];
function CollectionActivityPage() {
    const address = useAddress();
    const router = useRouter();
    const query = { ...router.query };
    const { data, loading, error } = useQuery(COLLECTION_INFO, {
        variables: {
            slug: router.query?.slug?.toLowerCase(),
        },
        fetchPolicy: 'network-only',
    });
    const [getEvents, { data: dataEvent, loading: loadingEvent }] =
        useLazyQuery(GET_EVENT_OF_COLLECTION);
    useEffect(() => {
        if (data?.getCollectionInfoBySlug)
            getEvents({
                variables: {
                    collectionId: data.getCollectionInfoBySlug._id,
                    query: JSON.stringify(query),
                },
            });
    }, [loading, router]);

    if (error || (!loading && !data?.getCollectionInfoBySlug))
        return <Error statusCode={404} />;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CollectionImage collection={data.getCollectionInfoBySlug} />
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
                                        router.route.includes('activity') &&
                                        tab.href === 'activity'
                                            ? 'text-white border-b-[3px] border-white'
                                            : 'text-[#8a939b]'
                                    }`}
                                >
                                    {tab.label}
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                <hr className="border-t-0 border-b-[1px] border-[#353840] pt-[10px]" />

                <div className="flex w-full mt-8">
                    <EventCollectionFilter />
                    {loadingEvent ? (
                        <div className="text-white w-3/4 ml-">Loading ...</div>
                    ) : (
                        <div className="w-3/4 ml-6">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-[1px] border-[#151b22]">
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        ></th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Item
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Unit Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            From
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            To
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataEvent?.getEventOfCollection &&
                                        dataEvent.getEventOfCollection.map(
                                            (e, i) => (
                                                <tr
                                                    className="border-t-[1px] border-[#151b22]"
                                                    key={i}
                                                >
                                                    <td className="text-[#e5e8eb] text-[15px] py-4 ">
                                                        <span className="flex">
                                                            {
                                                                options.find(
                                                                    option =>
                                                                        option.value ===
                                                                        e.eventName
                                                                )?.icon
                                                            }
                                                            {e.eventName}
                                                        </span>
                                                    </td>
                                                    <td className="text-[#e5e8eb] text-[15px] py-4  flex items-center">
                                                        <Link
                                                            href={`/assets/${e.assetContract}/${e.tokenId}`}
                                                        >
                                                            <a className="h-12 w-12 relative rounded-[10px] overflow-hidden">
                                                                {e.media && (
                                                                    <Image
                                                                        src={
                                                                            e.media
                                                                        }
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        alt="media"
                                                                    />
                                                                )}
                                                            </a>
                                                        </Link>
                                                        <div className="flex flex-col ml-2">
                                                            <Link
                                                                href={`/assets/${e.assetContract}/${e.tokenId}`}
                                                            >
                                                                <a className="text-white font-semibold">
                                                                    {e.nftName}
                                                                </a>
                                                            </Link>
                                                            <Link
                                                                href={`/collection/${e.collectionSlug}`}
                                                            >
                                                                <a className="text-[#8a939b] text-xs hover:text-white">
                                                                    {
                                                                        data
                                                                            .getCollectionInfoBySlug
                                                                            .name
                                                                    }
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="text-[#e5e8eb] text-[15px] py-4  font-semibold">
                                                        {e.price
                                                            ? `${e.price} ${e.currency}`
                                                            : ''}
                                                    </td>
                                                    <td className="py-4 ">
                                                        {e?.from?._id && (
                                                            <Link
                                                                href={`/${e.from._id}`}
                                                            >
                                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                                    {e.from
                                                                        ._id ===
                                                                    address
                                                                        ? 'you'
                                                                        : e.from
                                                                              .username ===
                                                                          'Unnamed'
                                                                        ? e.from._id
                                                                              .slice(
                                                                                  -6
                                                                              )
                                                                              .toUpperCase()
                                                                        : e.from
                                                                              .username}
                                                                </a>
                                                            </Link>
                                                        )}
                                                    </td>
                                                    <td className="py-4 ">
                                                        {e?.to?._id && (
                                                            <Link
                                                                href={`/${e.to?._id}`}
                                                            >
                                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                                    {e.to
                                                                        ._id ===
                                                                    address
                                                                        ? 'you'
                                                                        : e.to
                                                                              .username ===
                                                                          'Unnamed'
                                                                        ? e.to._id
                                                                              .slice(
                                                                                  -6
                                                                              )
                                                                              .toUpperCase()
                                                                        : e.to
                                                                              .username}
                                                                </a>
                                                            </Link>
                                                        )}
                                                    </td>
                                                    {e.transactionHash ? (
                                                        <td className="py-4 ">
                                                            <a
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={
                                                                    process.env
                                                                        .NEXT_PUBLIC_ETHERSCAN_LINK +
                                                                    '/tx/' +
                                                                    e.transactionHash
                                                                }
                                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                                            >
                                                                <Tooltip
                                                                    content={formatToUSDate(
                                                                        e.startTimestamp
                                                                    )}
                                                                >
                                                                    <div className="flex">
                                                                        {timeElapsed(
                                                                            e.startTimestamp
                                                                        )}
                                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                                    </div>
                                                                </Tooltip>
                                                            </a>
                                                        </td>
                                                    ) : (
                                                        <td className="py-4 ">
                                                            <div className="text-[15px] text-white inline-block max-w-full">
                                                                <Tooltip
                                                                    content={formatToUSDate(
                                                                        e.startTimestamp
                                                                    )}
                                                                >
                                                                    <div className="flex">
                                                                        {timeElapsed(
                                                                            e.startTimestamp
                                                                        )}
                                                                    </div>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CollectionActivityPage;
