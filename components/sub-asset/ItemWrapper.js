import React from 'react';
import Icon from './../../assets/icons';
import Image from 'next/image';
import {
    MdFavoriteBorder,
    MdOutlineSubject,
    MdVerticalSplit,
    MdBallot,
} from 'react-icons/md';
import Link from 'next/link';
import { Accordion, Tooltip } from 'flowbite-react';
import { useContract, useNFT, useAddress } from '@thirdweb-dev/react';
import {
    MdRefresh,
    MdOutlineOpenInNew,
    MdShare,
    MdMoreVert,
    MdOutlineVisibility,
    MdFavorite,
    MdSchedule,
    MdAccountBalanceWallet,
    MdLocalOffer,
    MdTimeline,
    MdToc,
    MdOutlineCategory,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { useQuery } from '@apollo/client';
import { GET_USER_NAME_BY_ID } from '../../graphql/query';
import shortenAddress from '../../utils/shortenAddress';

function ItemWrapper({ nft, collection, contractAddress, tokenId }) {
    const router = useRouter();
    const address = useAddress();

    const { data: user } = useQuery(GET_USER_NAME_BY_ID, {
        variables: { getUserByIdId: nft.owner.toLowerCase() },
    });
    console.log('user', user);

    return (
        <div className="flex">
            <div className="flex-[3_0_0%] flex-col max-w-[43%]">
                <div className="rounded-[10px] overflow-hidden w-[508px] m-5">
                    <div className="w-full bg-[#303339] h-[42px] flex items-center justify-between p-3">
                        <div className="h-full">
                            <Image
                                src={Icon.EthLogo.src}
                                alt="eth"
                                width={12}
                                height={23}
                            />
                        </div>
                        <div className="flex h-full">
                            <p className="text-xs mr-2 mt-[2px] text-[#A6ADBA]">
                                15
                            </p>
                            <button className="group">
                                <MdFavoriteBorder className="text-xl text-[#A6ADBA] group-hover:text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full h-[508px]">
                        <Image
                            src="https://lh3.googleusercontent.com/i3Iqyus4sFZCVQK2z7NpCq8EqUaXWfEqmWQtF4cJ59-2VRsbgT9-5qGU7hjU8A_XO29KiiEgEjaGPKg1f9iGJzSBoXQhytBdx-3jV2g=w600"
                            alt="nft-item"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-b-[10px] overflow-hidden"
                        />
                    </div>
                </div>

                <div className="m-5 mt-0 w-[508px] bg-[#262b2f] rounded-[10px]">
                    <div className="flex p-5">
                        <MdOutlineSubject className="text-white text-2xl mr-[10px]" />
                        <span className="text-white font-semibold">
                            Description
                        </span>
                    </div>
                    <div className="p-5 border-t border-[#151b22]">
                        <div className="flex">
                            <p className="text-white bold">By &nbsp;</p>
                            <Link href={`/${nft.owner?.toLowerCase()}`}>
                                <a className="text-white font-bold">
                                    {nft.owner?.toLowerCase() ===
                                    address?.toLowerCase()
                                        ? 'you'
                                        : user?.getUserById.username ===
                                          'Unnamed'
                                        ? nft.owner?.splice(-5).toUpperCase()
                                        : user?.getUserById.username}
                                </a>
                            </Link>
                        </div>

                        <p className="text-white text-sm">
                            {nft?.metadata.description}
                        </p>
                    </div>

                    <Accordion
                        alwaysOpen={true}
                        className="border-0 divide-y-0"
                    >
                        <Accordion.Panel>
                            <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent !rounded-t-none">
                                <div className="flex">
                                    <MdVerticalSplit className="text-white text-2xl mr-[10px]" />
                                    About {collection?.name}
                                </div>
                            </Accordion.Title>
                            <Accordion.Content className="px-5 py-2">
                                <div className="pb-5">
                                    <Link href="/">
                                        <a className="mt-[3px] mr-[10px] w-[80px] h-[55px] rounded-[10px] overflow-hidden float-left relative">
                                            <Image
                                                src={collection?.featuredImage}
                                                alt="avatar"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </a>
                                    </Link>

                                    <p className="text-white text-sm break-words">
                                        {collection?.description}
                                    </p>
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent !rounded-t-none">
                                <div className="flex">
                                    <MdBallot className="text-white text-2xl mr-[10px]" />
                                    Details
                                </div>
                            </Accordion.Title>
                            <Accordion.Content className="px-5 py-2">
                                <div className="px-0 pb-5">
                                    <div className="flex justify-between mt-2">
                                        <span className="text-white text-[15px]">
                                            Contract Address
                                        </span>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`https://goerli.etherscan.io/address/${contractAddress}`}
                                            className="text-[#207fe2] text-sm hover:text-[#1868b7]"
                                        >
                                            {shortenAddress(contractAddress)}
                                        </a>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-white text-[15px]">
                                            Token ID
                                        </span>
                                        <Tooltip content="Copy" style="dark">
                                            <button className="text-sm font-medium text-[#A6ADBA]">
                                                {nft?.metadata.id}
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-white text-[15px]">
                                            Token Standard
                                        </span>
                                        <span className="text-sm font-medium text-[#A6ADBA]">
                                            {nft?.type}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-white text-[15px]">
                                            Blockchain
                                        </span>
                                        <span className="text-sm font-medium text-[#A6ADBA]">
                                            Ethereum Goerli
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-white text-[15px]">
                                            Creator Earnings
                                        </span>
                                        <span className="text-sm font-medium text-[#A6ADBA]">
                                            5%
                                        </span>
                                    </div>
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>

            <div className="flex-[4_0_0%] flex-col my-5 ">
                {/* title */}
                <div>
                    <div className="flex justify-between items-center">
                        <Link href={`/collection/${collection?.slug}`}>
                            <a className="text-[#2081e2] hover:text-[#1868b7]">
                                {collection?.name}
                            </a>
                        </Link>

                        <div className="inline-flex">
                            <button className="outline-0 bg-#202225 border-2 border-[#4c505c] p-[11px] rounded-l-[10px] hover:border-[#8a939b]">
                                <MdRefresh className="text-white text-[22px]" />
                            </button>
                            <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] hover:border-[#8a939b]">
                                <MdOutlineOpenInNew className="text-white text-[22px]" />
                            </button>
                            <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] hover:border-[#8a939b]">
                                <MdShare className="text-white text-[22px]" />
                            </button>
                            <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] rounded-r-[10px] hover:border-[#8a939b]">
                                <MdMoreVert className="text-white text-[22px]" />
                            </button>
                        </div>
                    </div>
                    <h1 className="font-semibold text-[#e5e8eb] text-3xl">
                        {nft.metadata.name}
                    </h1>
                </div>

                {/* counter */}
                <div className="flex my-5">
                    <div>
                        <span className="text-[15px] text-[#A6ADBA]">
                            Owned by&nbsp;
                        </span>
                        <Link href={`/${nft.owner?.toLowerCase()}`}>
                            <a className="text-[#2081e2] hover:text-[#1868b7]">
                                {nft.owner?.toLowerCase() ===
                                address?.toLowerCase()
                                    ? 'you'
                                    : user?.getUserById.username === 'Unnamed'
                                    ? nft.owner?.splice(-5).toUpperCase()
                                    : user?.getUserById.username}
                            </a>
                        </Link>
                    </div>
                    <div className="flex mx-2">
                        <MdOutlineVisibility className="text-2xl mx-2 text-[#A6ADBA]" />
                        <span className="text-[15px] text-[#A6ADBA]">
                            3.9K views
                        </span>
                    </div>
                    {collection.category && (
                        <div className="flex">
                            <MdOutlineCategory className="text-2xl mx-2 text-[#A6ADBA]" />
                            <span className="text-[15px] text-[#A6ADBA]">
                                {collection.category}
                            </span>
                        </div>
                    )}
                </div>

                {/* sale */}
                <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px]">
                    <div className="flex p-5">
                        <MdSchedule className="text-2xl text-[#A6ADBA]" />
                        <span className="text-[#e5e8eb] ml-2">
                            Sale ends August 10, 2022 at 8:29am GMT+7
                        </span>
                    </div>
                    <div className="p-5 border-t-[1px] border-[#151b22]">
                        <span className="text-[#A6ADBA]">Current price</span>
                        <div className="flex items-center  mb-2">
                            <Image
                                src={Icon.EthPriceLogo.src}
                                alt="eth"
                                height={24}
                                width={24}
                                className="brightness-200"
                            />
                            <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                                0,99
                            </h1>
                            <span className="ml-2 text-[#A6ADBA]">
                                ($1.620,01)
                            </span>
                        </div>
                        <div className="flex">
                            <button className="flex h-full w-[206px] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#2081e2] hover:bg-[#2e8eee] rounded-xl text-white font-semibold ">
                                <MdAccountBalanceWallet className="mr-3" />
                                <span>Make offer</span>
                            </button>
                            <button className="ml-2 flex w-[206px] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#353840] hover:bg-[#4c505c] rounded-xl text-white font-semibold ">
                                <MdLocalOffer className="mr-3" />
                                <span>Make offer</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* chart */}
                <Accordion
                    alwaysOpen={true}
                    className="mt-5 bg-[#262b2f] border-0 divide-y-0"
                >
                    <Accordion.Panel>
                        <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                            <div className="flex">
                                <MdTimeline className="mr-[10px] text-2xl" />
                                Price History
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className="px-5 py-2">
                            <div className="pb-5">
                                <p className="text-white text-sm">
                                    Geometric Ape Club is a collection of 5555
                                    unique, randomly generated Apes NFTs on the
                                    Ethereum blockchain.Geometric Ape Club is a
                                    collection of 5555 unique, randomly
                                    generated Apes NFTs on the Ethereum
                                    blockchain.
                                </p>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>

                {/* listing */}
                <Accordion
                    alwaysOpen={true}
                    className="mt-5 bg-[#262b2f] border-0 divide-y-0"
                >
                    <Accordion.Panel>
                        <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                            <div className="flex">
                                <MdLocalOffer className="mr-[10px] text-2xl" />
                                Listings
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className="px-0 py-2">
                            <ul className="max-h-[332px] overflow-y-auto">
                                <li className="flex px-1 border-t-[1px] border-[#151b22]">
                                    <div className="text-[#e5e8eb] text-[15px] w-full pl-4 pr-2 py-1">
                                        Price
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        USD Price
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        Expiration
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        From
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1"></div>
                                </li>
                                <li className="flex items-center border-t-[1px] border-[#151b22]">
                                    <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                        <Image
                                            src={Icon.EthPriceLogo.src}
                                            alt="eth"
                                            height={16}
                                            width={16}
                                            className="brightness-200"
                                        />
                                        <span className="text-[#e5e8eb] text-[15px] font-semibold mx-[4.5px]">
                                            0,99
                                        </span>
                                        <span className="text-[#e5e8eb] text-[15px] ">
                                            ETH
                                        </span>
                                    </div>
                                    <div className="py-4 px-2 w-full">
                                        <span className="text-[#e5e8eb] text-[15px] ">
                                            $1.601,21
                                        </span>
                                    </div>
                                    <div className="py-4 px-3 w-full">
                                        <div
                                            className="tooltip tooltip-primary tooltip-top"
                                            data-tip="September 10, 2022 at 8:29am GMT+7"
                                        >
                                            <button className="text-[#e5e8eb] text-[15px]">
                                                about 1 month
                                            </button>
                                        </div>
                                    </div>
                                    <div className="py-4 px-2 w-full truncate max-w-[50%]">
                                        <Link href="/">
                                            <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                C05D74C05D74C05D74C05D74C05D74C05D74
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="w-full py-4 pr-4 pl-2">
                                        <button className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-6 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-all">
                                            Buy
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>

                {/* offers */}
                <Accordion
                    alwaysOpen={true}
                    className="mt-5 bg-[#262b2f] border-0 divide-y-0"
                >
                    <Accordion.Panel>
                        <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                            <div className="flex">
                                <MdToc className="mr-[10px] text-2xl" />
                                Offers
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className="px-5 py-2">
                            <ul className="max-h-[332px] overflow-y-auto">
                                <li className="flex border-t-[1px] border-[#151b22]">
                                    <div className="text-[#e5e8eb] text-[15px] w-full pl-4 pr-2 py-1 mr-[-1px]">
                                        Price
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        USD Price
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1 text-left">
                                        Floor Difference
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        Expiration
                                    </div>
                                    <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                        From
                                    </div>
                                </li>

                                <li className="flex items-center border-t-[1px] border-[#151b22]">
                                    <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                        <Image
                                            src={Icon.EthPriceLogo.src}
                                            alt="eth"
                                            height={16}
                                            width={16}
                                            className="brightness-200"
                                        />
                                        <span className="text-[#e5e8eb] text-[15px] font-semibold mx-[4.5px]">
                                            0,99
                                        </span>
                                        <span className="text-[#e5e8eb] text-[15px] ">
                                            ETH
                                        </span>
                                    </div>
                                    <div className="py-4 px-2 w-full">
                                        <span className="text-[#e5e8eb] text-[15px] ">
                                            $1.601,21
                                        </span>
                                    </div>
                                    <div className="py-4 px-3 w-full">
                                        <div
                                            className="tooltip tooltip-primary tooltip-top"
                                            data-tip="Collection floor price: 0.66 ETH"
                                        >
                                            <button className="text-[#e5e8eb] text-[15px]">
                                                33% below
                                            </button>
                                        </div>
                                    </div>
                                    <div className="py-4 px-2 w-full">
                                        <div
                                            className="tooltip tooltip-primary tooltip-top"
                                            data-tip="September 10, 2022 at 8:29am GMT+7"
                                        >
                                            <button className="text-[#e5e8eb] text-[15px]">
                                                3 days
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full py-4 pr-4 pl-2 truncate max-w-[80%]">
                                        <Link href="/">
                                            <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                C05D74C05D74C05D74
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    );
}

export default ItemWrapper;
