import { useEffect, useState } from 'react';
import {
    MdLocalOffer,
    MdAccountBalanceWallet,
    MdSchedule,
} from 'react-icons/md';
import validateLogin from '../../utils/validateLogin';
import Image from 'next/image';
import Icon from '../../assets/icons';
import { formatToUSDate, isValidDate } from '../../utils/formatDate';
import MakeOfferModal from './MakeOfferModal';
import { useAddress } from '@thirdweb-dev/react';
import ApprovePurchase from './ApprovePurchase';
import { useLazyQuery, useMutation } from '@apollo/client';
import { BUY_NOW_NFT } from '../../graphql/mutation';
import { useRouter } from 'next/router';
import PlaceABidModal from './PlcaceABidModal';
import { GET_BEST_BID } from '../../graphql/query';
import Countdown from './Countdown';

function Sale({ nft, address, toggleSidebar, usdPrice, notify, sdk, bestBid }) {
    const router = useRouter();

    const [makeOfferModalVisible, setMakeOfferModalVisible] = useState(false);
    function handleMakeOffer() {
        if (validateLogin(address)) {
            setMakeOfferModalVisible(true);
            document.body.style.overflowY = 'hidden';
        } else {
            toggleSidebar();
            console.log(false);
        }
    }

    const [buyNowNft] = useMutation(BUY_NOW_NFT);
    const [approvePurchaseModalVisible, setApprovePurchaseModalVisible] =
        useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [buyFromListing, setBuyFromListing] = useState(null);

    async function handleBuyNow() {
        setBuyFromListing(nft.listing);
        try {
            if (validateLogin(address)) {
                setApprovePurchaseModalVisible(true);
                document.body.style.overflowY = 'hidden';
                setIsPurchasing(true);
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );

                if (contract) {
                    const txResult =
                        await contract.directListings.buyFromListing(
                            nft.listing.listingId,
                            1,
                            address
                        );
                    const { data } = await buyNowNft({
                        variables: {
                            _idListing: nft.listing._id,
                            collectionNft: nft.collectionNft._id,
                            tokenId: nft.tokenId,
                            event: {
                                creator: address.toLowerCase(),
                                from: nft.owner._id,
                                to: address.toLowerCase(),
                                currency: nft.listing.currency,
                                price: nft.listing.price,
                                startTimestamp: new Date(),
                                transactionHash:
                                    txResult.receipt.transactionHash,
                            },
                        },
                    });

                    notify('success', undefined, 'Purchase successfully!');

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                toggleSidebar();
                console.log(false);
            }
        } catch (err) {
            console.log('message', err);
            setIsPurchasing(false);

            notify('error', 'Purchase failed');
        }
    }

    const [placeABidModalVisible, setPlaceABidModalVisible] = useState(false);
    function handlePlaceBid() {
        if (validateLogin(address)) {
            setPlaceABidModalVisible(true);
            document.body.style.overflowY = 'hidden';
        } else {
            toggleSidebar();
            console.log(false);
        }
    }
    return (
        <>
            {makeOfferModalVisible && (
                <MakeOfferModal
                    makeOfferModalVisible={makeOfferModalVisible}
                    setMakeOfferModalVisible={setMakeOfferModalVisible}
                    nft={nft}
                    usdPrice={usdPrice}
                    notify={notify}
                    address={address}
                    sdk={sdk}
                />
            )}

            {placeABidModalVisible && (
                <PlaceABidModal
                    placeABidModalVisible={placeABidModalVisible}
                    setPlaceABidModalVisible={setPlaceABidModalVisible}
                    nft={nft}
                    usdPrice={usdPrice}
                    notify={notify}
                    address={address}
                    sdk={sdk}
                    bestBid={bestBid}
                />
            )}

            {approvePurchaseModalVisible && (
                <ApprovePurchase
                    approvePurchaseModalVisible={approvePurchaseModalVisible}
                    setApprovePurchaseModalVisible={
                        setApprovePurchaseModalVisible
                    }
                    isPurchasing={isPurchasing}
                    nft={nft}
                    usdPrice={usdPrice}
                    listing={buyFromListing}
                />
            )}

            {
                // k dang nhap or dang nhap nhung khong phai chu so huu nft
                address?.toLowerCase() !== nft?.owner?._id?.toLowerCase() ? (
                    nft?.listing?.isListing ? (
                        <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px]">
                            <div className="flex p-5">
                                <MdSchedule className="text-2xl text-[#A6ADBA]" />
                                <span className="text-[#e5e8eb] ml-2">
                                    Sale ends{' '}
                                    {formatToUSDate(nft.listing.endTimestamp)}
                                    {nft.listing.type === 'acution' &&
                                        isValidDate(
                                            new Date(
                                                parseInt(
                                                    nft?.listing?.endTimestamp
                                                )
                                            )
                                        ) && (
                                            <Countdown
                                                targetDate={
                                                    nft?.listing?.endTimestamp
                                                }
                                            />
                                        )}
                                </span>
                            </div>
                            {nft.listing.type === 'fixed' ? (
                                <div className="p-5 border-t-[1px] border-[#151b22]">
                                    <span className="text-[#A6ADBA] ">
                                        Current price
                                    </span>
                                    <div className="flex items-center my-2">
                                        <Image
                                            src={
                                                nft.listing.currency.toLowerCase() ===
                                                'eth'
                                                    ? Icon.EthPriceLogo.src
                                                    : Icon.wethLogo.src
                                            }
                                            alt="eth"
                                            height={24}
                                            width={24}
                                        />
                                        <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                                            {nft.listing.price}{' '}
                                            {nft.listing.currency}
                                        </h1>
                                        <span className="ml-2 text-[#A6ADBA]">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(
                                                usdPrice[nft.listing.currency] *
                                                    nft.listing.price
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <button
                                            onClick={handleBuyNow}
                                            className="flex h-full w-[calc(100%-51px)] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#2081e2] hover:bg-[#2e8eee] rounded-xl text-white font-semibold "
                                        >
                                            <MdAccountBalanceWallet className="mr-3 text-2xl" />
                                            <span>Buy now</span>
                                        </button>
                                        <button
                                            onClick={handleMakeOffer}
                                            className="ml-2 flex w-[calc(100%-51px)] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#353840] hover:bg-[#4c505c] rounded-xl text-white font-semibold "
                                        >
                                            <MdLocalOffer className="mr-3 text-2xl" />
                                            <span>Make offer</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5 border-t-[1px] border-[#151b22]">
                                    <span className="text-[#A6ADBA] ">
                                        {bestBid ? 'Top ' : 'Minimum '}
                                        bid
                                    </span>
                                    <div className="flex items-center my-2">
                                        <Image
                                            src={
                                                nft.listing.currency.toLowerCase() ===
                                                'eth'
                                                    ? Icon.EthPriceLogo.src
                                                    : Icon.wethLogo.src
                                            }
                                            alt="eth"
                                            height={24}
                                            width={24}
                                        />
                                        <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                                            {bestBid || nft.listing.price}{' '}
                                            {nft.listing.currency}
                                        </h1>
                                        <span className="ml-2 text-[#A6ADBA]">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(
                                                usdPrice[nft.listing.currency] *
                                                    nft.listing.price
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <button
                                            onClick={handlePlaceBid}
                                            className="flex h-full w-[50%] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#2081e2] hover:bg-[#2e8eee] rounded-xl text-white font-semibold "
                                        >
                                            <MdAccountBalanceWallet className="mr-3 text-2xl" />
                                            <span>Place bid</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px] p-[20px]">
                            <button
                                onClick={handleMakeOffer}
                                className="w-[50%] flex items-center justify-center px-6 py-[17px] bg-[#353840] border-[1px] border-[#353840] text-white font-semibold rounded-xl text-base tracking-[0.01em] hover:bg-[#4c505c] hover:border-transparent"
                            >
                                <MdLocalOffer className="text-xl mr-3" />
                                Make offer
                            </button>
                        </div>
                    )
                ) : // chu tai khoan chu nft
                nft?.listing?.isListing ? (
                    <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px]">
                        <div className="flex p-5">
                            <MdSchedule className="text-2xl text-[#A6ADBA]" />
                            <span className="text-[#e5e8eb] ml-2">
                                Sale ends{' '}
                                {formatToUSDate(nft.listing.endTimestamp)}
                                {nft.listing.type === 'acution' &&
                                    isValidDate(
                                        new Date(
                                            parseInt(nft?.listing?.endTimestamp)
                                        )
                                    ) && (
                                        <Countdown
                                            targetDate={
                                                nft?.listing?.endTimestamp
                                            }
                                        />
                                    )}
                            </span>
                        </div>
                        {nft.listing.type === 'fixed' ? (
                            <div className="p-5 border-t-[1px] border-[#151b22]">
                                <span className="text-[#A6ADBA] ">
                                    Current price
                                </span>
                                <div className="flex items-center my-2">
                                    <Image
                                        src={
                                            nft.listing.currency.toLowerCase() ===
                                            'eth'
                                                ? Icon.EthPriceLogo.src
                                                : Icon.wethLogo.src
                                        }
                                        alt="eth"
                                        height={24}
                                        width={24}
                                    />
                                    <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                                        {nft.listing.price}{' '}
                                        {nft.listing.currency}
                                    </h1>
                                    <span className="ml-2 text-[#A6ADBA]">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(
                                            usdPrice[nft.listing.currency] *
                                                nft.listing.price
                                        )}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-5 border-t-[1px] border-[#151b22]">
                                <span className="text-[#A6ADBA] ">
                                    {bestBid ? 'Top ' : 'Minimum '}
                                    bid
                                </span>
                                <div className="flex items-center my-2">
                                    <Image
                                        src={
                                            nft.listing.currency.toLowerCase() ===
                                            'eth'
                                                ? Icon.EthPriceLogo.src
                                                : Icon.wethLogo.src
                                        }
                                        alt="eth"
                                        height={24}
                                        width={24}
                                    />
                                    <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                                        {bestBid || nft.listing.price}{' '}
                                        {nft.listing.currency}
                                    </h1>
                                    <span className="ml-2 text-[#A6ADBA]">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(
                                            usdPrice[nft.listing.currency] *
                                                nft.listing.price
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null
            }
        </>
    );
}

export default Sale;
