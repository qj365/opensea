import { useState } from 'react';
import EventFilter from './EventFilter';
import { Tooltip } from 'flowbite-react';
import {
    MdAutoAwesome,
    MdCancel,
    MdMultipleStop,
    MdOpenInNew,
    MdSell,
    MdShoppingCart,
} from 'react-icons/md';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_EVENT_OF_USER } from '../../graphql/query';
import { useAddress } from '@thirdweb-dev/react';
import { formatToUSDate, timeElapsed } from '../../utils/formatDate';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
function ActivityTab({ token }) {
    const address = useAddress();
    const router = useRouter();
    const query = { ...router.query };

    const { data, loading, error } = useQuery(GET_EVENT_OF_USER, {
        variables: {
            userAddress: token,
            query: JSON.stringify(query),
        },
    });
    return (
        <div className="flex w-full mt-8">
            <EventFilter />
            {loading ? (
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
                            {data?.getEventByUserAddress &&
                                data.getEventByUserAddress.map((e, i) => (
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
                                                    <Image
                                                        src={e.media}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="media"
                                                    />
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
                                                        {e.collectionName}
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
                                                <Link href={`/${e.from._id}`}>
                                                    <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                        {e.from._id === address
                                                            ? 'you'
                                                            : e.from
                                                                  .username ===
                                                              'Unnamed'
                                                            ? e.from._id
                                                                  .slice(-6)
                                                                  .toUpperCase()
                                                            : e.from.username}
                                                    </a>
                                                </Link>
                                            )}
                                        </td>
                                        <td className="py-4 ">
                                            {e?.to?._id && (
                                                <Link href={`/${e.to?._id}`}>
                                                    <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                        {e.to._id === address
                                                            ? 'you'
                                                            : e.to.username ===
                                                              'Unnamed'
                                                            ? e.to._id
                                                                  .slice(-6)
                                                                  .toUpperCase()
                                                            : e.to.username}
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
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ActivityTab;
