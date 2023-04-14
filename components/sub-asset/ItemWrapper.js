import { useContext, useEffect, useState } from 'react';
import Icon from './../../assets/icons';
import Image from 'next/image';
import {
    MdFavoriteBorder,
    MdOutlineSubject,
    MdVerticalSplit,
    MdBallot,
    MdAccessTime,
    MdBolt,
} from 'react-icons/md';
import Link from 'next/link';
import { Accordion, Tooltip } from 'flowbite-react';
import { useContract, useNFT, useAddress, useSDK } from '@thirdweb-dev/react';
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
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_NAME_BY_ID } from '../../graphql/query';
import shortenAddress from '../../utils/shortenAddress';
import shortenNumber from '../../utils/shortenNumber';
import validateLogin from '../../utils/validateLogin';
import { SidebarContext } from '../../context/sidebar-context';
import Sale from '../nft/Sale';
import diffDay from '../../utils/diffDay';
import { formatToUSDate } from '../../utils/formatDate';
import EditListingModal from '../nft/EditListingModal';
import CloseListingModal from '../nft/CloseListingModal';
import { CREATE_EVENT, DEACTIVE_EVENT } from '../../graphql/mutation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelOfferModal from '../nft/CancelOfferModal';
import ApproveListingModal from '../nft/ApproveListingModal';
import ApproveSaleModal from '../nft/ApproveSaleModal';

const notify = (
    status,
    errorMessage = 'Something went wrong!',
    successMessage = 'Success!'
) => {
    const settingToast = {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    };
    if (status === 'success') toast.success(successMessage, settingToast);
    else toast.error(errorMessage, settingToast);
};

function ItemWrapper({ nft }) {
    const router = useRouter();
    const address = useAddress();
    const sdk = useSDK();

    const [usdPrice, setUsdPrice] = useState({
        ETH: undefined,
        WETH: undefined,
    });

    const { sidebarIsVisible, toggleSidebar, hideSidebar } =
        useContext(SidebarContext);

    function handleMakeOffer() {
        if (validateLogin(address)) {
            console.log(true);
        } else {
            toggleSidebar();
            console.log(false);
        }
    }

    const [openListingModal, setOpenListingModal] = useState(false);
    function handleEditListing() {
        if (validateLogin(address)) {
            console.log(true);
        } else {
            toggleSidebar();
            console.log(false);
        }
    }

    const [validListings, setValidListings] = useState([]);
    const [validOffers, setValidOffers] = useState([]);
    useEffect(() => {
        if (nft && nft?.listing?.isListing) {
            const validListings = nft.events.filter(
                event =>
                    (event.eventType === 'fixed' ||
                        event.eventType === 'auction') &&
                    event.active &&
                    event.endTimestamp > Date.now()
            );
            if (validListings.length > 0) setValidListings(validListings);
        }
        if (nft?.events) {
            const validOffers = nft.events.filter(
                event =>
                    event.eventType === 'offer' &&
                    event.active &&
                    event.endTimestamp > Date.now()
            );
            if (validOffers.length > 0) setValidOffers(validOffers);
        }
    }, []);

    useEffect(() => {
        async function getUsdPrice() {
            const eth = await (
                await fetch(
                    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
                )
            ).json();

            const weth = await (
                await fetch(
                    'https://min-api.cryptocompare.com/data/price?fsym=WETH&tsyms=USD'
                )
            ).json();
            setUsdPrice({ ETH: eth.USD, WETH: weth.USD });
        }
        getUsdPrice();
    }, []);

    const [isApproving, setIsApproving] = useState(false);

    const [deactiveEvent] = useMutation(DEACTIVE_EVENT);
    const [createEvent] = useMutation(CREATE_EVENT);
    const [isCanceling, setIsCanceling] = useState(false);
    async function cancleListings(listings) {
        const contract = await sdk.getContract(
            process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
            'marketplace-v3'
        );
        if (contract) {
            let txResult;
            if (listings[0].eventType === 'fixed') {
                txResult = await contract.directListings.cancelListing(
                    listings[0].eventId
                );
            } else {
                txResult = await contract.englishAuctions.cancelAuction(
                    listings[0].eventId
                );
            }

            const { data } = await deactiveEvent({
                variables: {
                    ids: listings.map(listing => listing._id),
                },
            });
            const now = new Date();
            const promises = listings.map(async listing => {
                const { data } = await createEvent({
                    variables: {
                        input: {
                            eventType: listing.eventType,
                            eventName: 'Cancel',
                            creator: address.toLowerCase(),
                            assetContract: listing.assetContract,
                            from: address.toLowerCase(),
                            tokenId: listing.tokenId,
                            startTimestamp: now,
                            eventId: listing.eventId,
                        },
                    },
                });
                return data;
            });
            await Promise.all(promises);
        } else {
            throw new Error('Contract not found');
        }
    }

    const [closeListingModalVisible, setCloseListingModalVisible] =
        useState(false);
    const [closeListings, setCloseListings] = useState([]);
    async function handleCloseListings(listings, type = 0) {
        setCloseListings(listings);
        setCloseListingModalVisible(true);
        document.body.style.overflowY = 'hidden';
        try {
            if (validateLogin(address)) {
                setIsCanceling(true);
                await cancleListings(listings);

                notify('success', undefined, 'Cancel listing successfully!');
                if (type === 0)
                    setTimeout(() => {
                        router.reload();
                    }, 1000);
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            setIsCanceling(false);
            notify('error', 'Something went wrong when canceling listings.');
        }
    }

    const [cancelOfferModalVisible, setCancelOfferModalVisible] =
        useState(false);
    const [isCancelingOffer, setIsCancelingOffer] = useState(false);
    const [cancelOffer, setCancelOffer] = useState(null);
    async function handleCancelOffer(offer) {
        try {
            if (validateLogin(address)) {
                setCancelOfferModalVisible(true);
                setCancelOffer(offer);
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );

                if (contract) {
                    setIsCancelingOffer(true);
                    // const txResult = await contract.offers.cancelOffer(
                    //     offer.eventId
                    // );
                    const { data } = await deactiveEvent({
                        variables: { ids: [offer._id] },
                    });

                    notify('success', undefined, 'Offer canceled!');

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            notify('error', 'Cancel offer failed');
            setIsCancelingOffer(false);
        }
    }

    const [approveOfferModalVisible, setApproveOfferModalVisible] =
        useState(false);
    const [approveOffer, setApproveOffer] = useState(null);

    async function handleApproveOffer(offer) {
        setApproveOffer(offer);
        setApproveOfferModalVisible(true);
        document.body.style.overflowY = 'hidden';
    }

    return (
        <>
            {validateLogin(address) && (
                <div className="flex flex-row-reverse sticky z-10 top-[72px] bottom-0 right-0 py-3 bg-[#202225] border-b-[1px] border-[#353840]">
                    {nft?.listing?.isListing ? (
                        address?.toLowerCase() ===
                            nft?.owner?._id?.toLowerCase() && (
                            <button
                                onClick={() => {
                                    setOpenListingModal(true);
                                    document.body.style.overflowY = 'hidden';
                                }}
                                className="rounded-xl w-[166px] font-semibold text-base text-white bg-[#2081e2] py-[17px] px-6 tracking-[0.01]"
                            >
                                Edit listing
                            </button>
                        )
                    ) : (
                        <Link
                            href={`/assets/${nft.collectionNft._id}/${nft.tokenId}/sell`}
                        >
                            <a className="text-center rounded-xl w-[166px] font-semibold text-base text-white bg-[#2081e2] py-[17px] px-6 tracking-[0.01]">
                                Sell
                            </a>
                        </Link>
                    )}
                </div>
            )}
            <div className="flex">
                <div className="flex-[3_0_0%] flex-col max-w-[43%]">
                    <div className="rounded-[10px] overflow-hidden w-[508px] m-5 ml-0 border-[1px] border-[#303339]">
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
                                src={nft?.media}
                                alt="nft-item"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-b-[10px] overflow-hidden"
                            />
                        </div>
                    </div>

                    <div className="m-5 ml-0 mt-0 w-[508px] bg-[#262b2f] rounded-[10px]">
                        <div className="flex p-5">
                            <MdOutlineSubject className="text-white text-2xl mr-[10px]" />
                            <span className="text-white font-semibold">
                                Description
                            </span>
                        </div>
                        <div className="p-5 border-t border-[#151b22]">
                            <div className="flex">
                                <p className="text-white bold">By &nbsp;</p>
                                <Link
                                    href={`/${nft?.creator?._id?.toLowerCase()}`}
                                >
                                    <a className="text-white font-bold">
                                        {nft?.creator?._id?.toLowerCase() ===
                                        address?.toLowerCase()
                                            ? 'you'
                                            : nft?.creator?.username ===
                                              'Unnamed'
                                            ? nft?.creator?._id
                                                  ?.slice(-5)
                                                  .toUpperCase()
                                            : nft?.creator?.username}
                                    </a>
                                </Link>
                            </div>

                            <p className="text-white text-sm">
                                {nft?.description}
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
                                        About {nft?.collectionNft?.name}
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content className="px-5 py-2">
                                    <div className="mb-[10px] overflow-hidden">
                                        <Link
                                            href={`/collection/${nft?.collectionNft.slug}`}
                                        >
                                            <a className="block mt-[3px] mr-[10px] w-[80px] h-[55px] rounded-[10px] overflow-hidden float-left relative">
                                                <Image
                                                    src={
                                                        nft?.collectionNft
                                                            ?.featuredImage
                                                            ? nft?.collectionNft
                                                                  ?.featuredImage
                                                            : nft?.collectionNft
                                                                  ?.logoImage
                                                    }
                                                    alt="avatar"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </a>
                                        </Link>

                                        <p className="text-white text-sm break-words">
                                            {nft?.collectionNft?.description}
                                        </p>
                                        {nft?.collectionNft?.category && (
                                            <p className="text-white text-sm break-words">
                                                Category{' '}
                                                <span className="font-semibold">
                                                    {
                                                        nft?.collectionNft
                                                            ?.category
                                                    }
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title className="!border-t !border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent !rounded-t-none">
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
                                                href={`https://goerli.etherscan.io/address/${nft?.collectionNft._id}`}
                                                className="text-[#207fe2] text-sm hover:text-[#1868b7]"
                                            >
                                                {shortenAddress(
                                                    nft?.collectionNft._id
                                                )}
                                            </a>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-white text-[15px]">
                                                Token ID
                                            </span>
                                            <button className="text-sm font-medium text-[#A6ADBA]">
                                                {nft?.tokenId}
                                            </button>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-white text-[15px]">
                                                Token Standard
                                            </span>
                                            <span className="text-sm font-medium text-[#A6ADBA]">
                                                ERC-721
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
                                            {/* remember */}
                                            <span className="text-sm font-medium text-[#A6ADBA]">
                                                2.5%
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
                            <Link
                                href={`/collection/${nft?.collectionNft?.slug}`}
                            >
                                <a className="text-[#2081e2] hover:text-[#1868b7]">
                                    {nft?.collectionNft?.name}
                                </a>
                            </Link>

                            <div className="inline-flex">
                                <button className="rounded-[50%] hover:bg-[#4c505c] p-3 mr-2">
                                    <MdRefresh className="text-white text-[22px]" />
                                </button>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={nft?.media}
                                    className="rounded-[50%] hover:bg-[#4c505c] p-3"
                                >
                                    <MdOutlineOpenInNew className="text-white text-[22px]" />
                                </a>
                            </div>
                        </div>
                        <h1 className="font-semibold text-[#e5e8eb] text-3xl">
                            {nft?.name}
                        </h1>
                    </div>

                    {/* counter */}
                    <div className="flex my-5">
                        <div>
                            <span className="text-[15px] text-[#A6ADBA]">
                                Owned by&nbsp;
                            </span>
                            <Link href={`/${nft?.owner?._id?.toLowerCase()}`}>
                                <a className="text-[#2081e2] hover:text-[#1868b7]">
                                    {nft?.owner?._id?.toLowerCase() ===
                                    address?.toLowerCase()
                                        ? 'you'
                                        : nft?.owner?.username === 'Unnamed'
                                        ? nft?.owner?._id
                                              .slice(-5)
                                              .toUpperCase()
                                        : nft?.owner?.username}
                                </a>
                            </Link>
                        </div>
                        <div className="flex mx-2">
                            <MdOutlineVisibility className="text-2xl mx-2 text-[#A6ADBA]" />
                            <span className="text-[15px] text-[#A6ADBA]">
                                {`${shortenNumber(nft?.views)} ${
                                    nft?.views === 1 ? 'view' : 'views'
                                }`}
                            </span>
                        </div>
                        {nft?.collectionNft?.category && (
                            <div className="flex">
                                <MdOutlineCategory className="text-2xl mx-2 text-[#A6ADBA]" />
                                <span className="text-[15px] text-[#A6ADBA]">
                                    {nft?.collectionNft?.category}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* sale */}
                    <Sale
                        nft={nft}
                        address={address}
                        toggleSidebar={toggleSidebar}
                        usdPrice={usdPrice}
                        notify={notify}
                        sdk={sdk}
                    />

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
                                <div className="flex flex-col items-center text-[#8a939b] py-10">
                                    <MdAccessTime className="text-[32px] mb-8" />
                                    <div className="text-sm font-semibold">
                                        No events have occurred yet
                                    </div>
                                    <div className="text-sm">
                                        Check back later.
                                    </div>
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
                                {validListings.length > 0 ? (
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
                                        {validListings.map((listing, index) => (
                                            <li
                                                className="flex items-center border-t-[1px] border-[#151b22]"
                                                key={index}
                                            >
                                                <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                                    <Image
                                                        src={
                                                            listing.currency ===
                                                            'ETH'
                                                                ? Icon
                                                                      .EthPriceLogo
                                                                      .src
                                                                : Icon.wethLogo
                                                                      .src
                                                        }
                                                        alt="eth"
                                                        height={16}
                                                        width={16}
                                                    />
                                                    <span className="text-[#e5e8eb] text-[15px] font-semibold mx-[4.5px]">
                                                        {listing.price +
                                                            ' ' +
                                                            listing.currency}
                                                    </span>
                                                </div>
                                                <div className="py-4 px-2 w-full">
                                                    <span className="text-[#e5e8eb] text-[15px] ">
                                                        {new Intl.NumberFormat(
                                                            'en-US',
                                                            {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }
                                                        ).format(
                                                            listing.price *
                                                                usdPrice[
                                                                    listing
                                                                        .currency
                                                                ]
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="py-4 px-3 w-full">
                                                    <Tooltip
                                                        content={formatToUSDate(
                                                            listing?.endTimestamp
                                                        )}
                                                    >
                                                        <div className="text-[#e5e8eb] text-[15px]">
                                                            {diffDay(
                                                                new Date(),
                                                                new Date(
                                                                    parseInt(
                                                                        listing?.endTimestamp
                                                                    )
                                                                ),
                                                                'in '
                                                            )}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                                <div className="py-4 px-2 w-full truncate max-w-[50%]">
                                                    <Link
                                                        href={`/${listing.creator._id}`}
                                                    >
                                                        <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                            {listing.creator
                                                                ._id ===
                                                            address?.toLowerCase()
                                                                ? 'you'
                                                                : listing
                                                                      .creator
                                                                      ?.username ||
                                                                  listing
                                                                      .creator
                                                                      ?._id}
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="w-full py-4 pr-4 pl-2">
                                                    {listing.creator._id ===
                                                    address?.toLowerCase() ? (
                                                        <button
                                                            className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-5 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-colors"
                                                            onClick={() =>
                                                                handleCloseListings(
                                                                    [listing]
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    ) : (
                                                        <button className="flex items-center text-white bg-[#2081e2] rounded-xl font-semibold py-[11px] px-4 hover:bg-[#2e8eee] transition-colors">
                                                            <MdBolt className="text-[22px]" />
                                                            Buy
                                                        </button>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex flex-col items-center relative">
                                        <Image
                                            src={Icon.noListingLogo.src}
                                            width={136}
                                            height={100}
                                            alt="no offer"
                                            className="opacity-50"
                                        />
                                        <p className="text-white mt-2">
                                            No listings yet
                                        </p>
                                    </div>
                                )}
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
                            <Accordion.Content className="px-0 py-2">
                                {validOffers.length > 0 ? (
                                    <ul className="max-h-[332px] overflow-y-auto">
                                        <li className="flex border-t-[1px] border-[#151b22]">
                                            <div className="text-[#e5e8eb] text-[15px] w-full pl-4 pr-2 py-1 mr-[-1px]">
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
                                        {validOffers.map((offer, index) => (
                                            <li
                                                className="flex items-center border-t-[1px] border-[#151b22]"
                                                key={index}
                                            >
                                                <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                                    <Image
                                                        src={Icon.wethLogo.src}
                                                        alt="eth"
                                                        height={16}
                                                        width={16}
                                                        className="brightness-200"
                                                    />
                                                    <span className="text-[#e5e8eb] text-[15px] font-semibold mx-[4.5px]">
                                                        {offer.price}
                                                    </span>
                                                    <span className="text-[#e5e8eb] text-[15px] ">
                                                        ETH
                                                    </span>
                                                </div>
                                                <div className="py-4 px-2 w-full">
                                                    <span className="text-[#e5e8eb] text-[15px] ">
                                                        {new Intl.NumberFormat(
                                                            'en-US',
                                                            {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }
                                                        ).format(
                                                            offer.price *
                                                                usdPrice['WETH']
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="py-4 px-2 w-full">
                                                    <div
                                                        className="tooltip tooltip-primary tooltip-top"
                                                        data-tip="September 10, 2022 at 8:29am GMT+7"
                                                    >
                                                        <button className="text-[#e5e8eb] text-[15px]">
                                                            {diffDay(
                                                                new Date(),
                                                                new Date(
                                                                    parseInt(
                                                                        offer.endTimestamp
                                                                    )
                                                                ),
                                                                'in '
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full py-4 pr-4 pl-2 truncate max-w-[80%]">
                                                    <Link
                                                        href={`/${offer.creator._id}`}
                                                    >
                                                        <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                            {offer.creator
                                                                ._id ===
                                                            address?.toLowerCase()
                                                                ? 'you'
                                                                : offer.creator
                                                                      ?.username ||
                                                                  offer.creator?._id
                                                                      .slice(-6)
                                                                      .toUpperCase()}
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className="py-4 px-2 w-full">
                                                    {offer.creator._id ===
                                                    address?.toLowerCase() ? (
                                                        <button
                                                            className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-5 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-colors"
                                                            onClick={() =>
                                                                handleCancelOffer(
                                                                    offer
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    ) : (
                                                        address?.toLowerCase() ===
                                                            nft.owner._id && (
                                                            <button
                                                                className="flex items-center text-white bg-[#2081e2] rounded-xl font-semibold py-[11px] px-4 hover:bg-[#2e8eee] transition-colors"
                                                                onClick={() =>
                                                                    handleApproveOffer(
                                                                        offer
                                                                    )
                                                                }
                                                            >
                                                                <MdBolt className="text-[22px]" />
                                                                Accept
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex flex-col items-center relative">
                                        <Image
                                            src={Icon.noOfferLogo.src}
                                            width={136}
                                            height={100}
                                            alt="no offer"
                                            className="opacity-50"
                                        />
                                        <p className="text-white mt-2">
                                            No offers yet
                                        </p>
                                    </div>
                                )}
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
            {nft?.listing && (
                <>
                    <EditListingModal
                        openListingModal={openListingModal}
                        setOpenListingModal={setOpenListingModal}
                        nft={nft}
                        usdPrice={usdPrice}
                        handleCloseListings={handleCloseListings}
                        validListings={validListings}
                        notify={notify}
                        isApproving={isApproving}
                        setIsApproving={setIsApproving}
                    />
                    <CloseListingModal
                        closeListingModalVisible={closeListingModalVisible}
                        setCloseListingModalVisible={
                            setCloseListingModalVisible
                        }
                        listings={closeListings}
                        usdPrice={usdPrice}
                        nft={nft}
                        isCanceling={isCanceling}
                        isApproving={isApproving}
                    />
                    <CancelOfferModal
                        cancelOfferModalVisible={cancelOfferModalVisible}
                        setCancelOfferModalVisible={setCancelOfferModalVisible}
                        isCancelingOffer={isCancelingOffer}
                        nft={nft}
                        usdPrice={usdPrice}
                        offer={cancelOffer}
                    />
                    {approveOffer && (
                        <ApproveSaleModal
                            approveOfferModalVisible={approveOfferModalVisible}
                            setApproveOfferModalVisible={
                                setApproveOfferModalVisible
                            }
                            nft={nft}
                            usdPrice={usdPrice}
                            offer={approveOffer}
                            notify={notify}
                            sdk={sdk}
                            address={address}
                        />
                    )}
                </>
            )}

            <ToastContainer />
        </>
    );
}

export default ItemWrapper;
