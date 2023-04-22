import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import { MdAccountBalanceWallet, MdClose } from 'react-icons/md';
import TextInput from '../common/TextInput';
import Select from 'react-select';
import { useSDK, useAddress, useBalance } from '@thirdweb-dev/react';
import { useQuery } from '@apollo/client';
import { GET_BEST_BID } from '../../graphql/query';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, UPDATE_EVENT, UPDATE_NFT } from '../../graphql/mutation';
import validateLogin from '../../utils/validateLogin';
import { useRouter } from 'next/router';
import Decimal from 'decimal.js';

function PlaceABidModal({
    placeABidModalVisible,
    setPlaceABidModalVisible,
    nft,
    usdPrice,
    notify,
    address,
    sdk,
    bestBid,
}) {
    const router = useRouter();

    const [updateEvent] = useMutation(UPDATE_EVENT);

    const [isPlacingBid, setIsPlacingBid] = useState(false);
    const [createEvent] = useMutation(CREATE_EVENT);

    const [higherBid, setHigherBid] = useState(
        (bestBid
            ? new Decimal(bestBid)
                  .mul(
                      new Decimal(100).add(
                          new Decimal(process.env.NEXT_PUBLIC_BID_BUFFER)
                      )
                  )

                  .div(100)
                  .toNumber()
            : nft?.listing?.price) || ''
    );
    const [price, setPrice] = useState(higherBid);
    const { data: wethBalance, isLoading } = useBalance(
        process.env.NEXT_PUBLIC_WETH_ADDRESS
    );
    function handleChangePrice(e) {
        const regex = /^\d+(\.\d*)?$/;

        if (e.target.value === '' || regex.test(e.target.value)) {
            setPrice(e.target.value);
        }
    }
    const [gtError, setGtError] = useState('');
    const [bidError, setBidError] = useState('');
    useEffect(() => {
        if (wethBalance) {
            if (parseFloat(wethBalance.displayValue) < parseFloat(price)) {
                setGtError("You don't have enough WETH");
            } else {
                setGtError('');
            }
            if (bestBid) {
                if (higherBid > parseFloat(price)) {
                    setBidError(
                        `Place a bid of at least ${higherBid} WETH to become the highest bidder`
                    );
                } else {
                    setBidError('');
                }
            } else {
                if (parseFloat(nft.listing.price) > parseFloat(price)) {
                    setBidError(
                        `Place a bid of at least ${nft.listing.price} WETH to become the first bidder`
                    );
                } else {
                    setBidError('');
                }
            }
        }
    }, [price, wethBalance, nft, bestBid]);

    const [updateNft] = useMutation(UPDATE_NFT);
    async function handlePlaceBid() {
        try {
            if (validateLogin(address)) {
                setIsPlacingBid(true);
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );
                console.log(nft?.listing?.endTimestamp - new Date());

                if (contract) {
                    const inputContract = {
                        assetContractAddress: nft.collectionNft._id,
                        tokenId: nft.tokenId,
                        totalPrice: parseFloat(price),
                    };

                    const txResult = await contract.englishAuctions.makeBid(
                        nft.listing.listingId,
                        inputContract.totalPrice
                    );

                    if (
                        parseInt(nft?.listing?.endTimestamp) - new Date() <
                        process.env.NEXT_PUBLIC_TIME_BUFFER * 1000
                    ) {
                        const auction =
                            await contract.englishAuctions.getAuction(
                                nft.listing.listingId
                            );
                        await updateEvent({
                            variables: {
                                updateEventId: nft.listing._id,
                                input: {
                                    endTimestamp: (
                                        auction.endTimeInSeconds * 1000
                                    ).toString(),
                                },
                            },
                        });
                    }

                    const input = {
                        eventId: nft.listing.listingId,
                        eventType: 'bid',
                        eventName: 'Offer',
                        active: true,
                        creator: address.toLowerCase(),
                        assetContract: inputContract.assetContractAddress,
                        from: address.toLowerCase(),
                        tokenId: inputContract.tokenId,
                        currency: 'WETH',
                        price: inputContract.totalPrice,
                        startTimestamp: new Date(),
                        transactionHash: txResult.receipt.transactionHash,
                    };
                    const { data } = await createEvent({
                        variables: {
                            input,
                        },
                    });
                    delete nft.onAuction.__typename;

                    await updateNft({
                        variables: {
                            updateNftId: nft._id,
                            input: {
                                onAuction: {
                                    ...nft.onAuction,
                                    winner: address.toLowerCase(),
                                    price: input.price,
                                },
                            },
                        },
                    });

                    notify('success', undefined, 'Bid created!');

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            notify('error', 'Create bid failed');
            // setIsApproving(false);
            setIsPlacingBid(false);
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                placeABidModalVisible ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'
            }`}
        >
            <div className="bg-[#262b2f] w-[700px] rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center pt-8 pb-4 px-6 border-[1px] border-[#353840]">
                    <h4 className="text-white text-2xl font-semibold">
                        Place a bid
                    </h4>
                    <MdClose
                        className="text-[#8a939b] text-2xl hover:text-[#646d75] cursor-pointer"
                        onClick={() => {
                            setPlaceABidModalVisible(false);
                            document.body.style.overflowY = 'auto';
                        }}
                    />
                </div>
                <div className="flex items-center px-6 py-4">
                    <div className="w-[72px] h-[72px] relative rounded-[4px] overflow-hidden mr-4">
                        <div className="relative inset-0 w-full h-full flex items-center justify-center z-10 opacity-40">
                            <ClipLoader
                                loading={false}
                                color={'#ffffff'}
                                cssOverride={{
                                    borderWidth: '5px',
                                    zIndex: '10',
                                }}
                                size={40}
                            />
                        </div>
                        <Image
                            src={nft.media}
                            layout="fill"
                            objectFit="contain"
                            alt="media"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-semibold text-base">
                            {nft.name}
                        </p>

                        <div className="text-[#e5e8eb] text-[15px]">
                            {nft.collectionNft.name}
                        </div>
                    </div>

                    <div className="flex flex-col text-right ">
                        <p className="text-white text-base font-semibold">
                            {price ? price : '--' + ' '} WETH
                        </p>
                        <p className="text-[#8a939b] text-sm font-normal">
                            {price
                                ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                  }).format(price * usdPrice['WETH'])
                                : '--'}{' '}
                            USD
                        </p>
                    </div>
                </div>
                <div className="px-6">
                    <div className="py-3 mb-4 border border-[#353840] bg-[#202225] rounded-xl">
                        <div className="px-4 py-1 flex items-center justify-between">
                            <div className="flex items-center">
                                <MdAccountBalanceWallet className="text-white font-[20px] mr-3" />
                                <span className="text-white text-base">
                                    Balance
                                </span>
                            </div>
                            <div className="text-white text-base">{`${
                                wethBalance
                                    ? wethBalance.displayValue.slice(0, 5)
                                    : '--'
                            } WETH`}</div>
                        </div>
                        <div className="px-4 py-1 flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-white text-base">
                                    Best offer
                                </span>
                            </div>
                            <div className="text-white text-base">{`${
                                bestBid ? bestBid : '--'
                            } WETH`}</div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full mb-4">
                            <div className="w-full flex items-end mb-1">
                                <div className="w-full">
                                    <TextInput
                                        placeholder="Price"
                                        inputCss="no-spin-buttons w-full pr-20"
                                        id="price"
                                        onChange={handleChangePrice}
                                        value={price}
                                    />
                                </div>
                                <span className="text-white font-semibold text-base w-0 relative right-20 bottom-3  ">
                                    <span className="border-r-[1px] border-[4c505c] mr-2"></span>
                                    WETH
                                </span>
                            </div>
                            <div className="text-red-500 text-sm font-normal">
                                <p>{gtError}</p>
                                <p>{bidError}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <button
                        className={`w-full text-base font-semibold tracking-[0.01em] py-[17px] px-6 bg-[#2081e2] border border-transparent text-white rounded-xl  ${
                            Boolean(parseFloat(price)) &&
                            !gtError &&
                            !bidError &&
                            !isPlacingBid
                                ? 'hover:bg-[#2e8eee]'
                                : 'opacity-40 hover:bg-inherit'
                        }'}`}
                        disabled={
                            !Boolean(parseFloat(price)) ||
                            gtError ||
                            bidError ||
                            isPlacingBid
                        }
                        onClick={handlePlaceBid}
                    >
                        {isPlacingBid ? (
                            <div className="flex items-center justify-center">
                                <ClipLoader
                                    loading={true}
                                    color={'#ffffff'}
                                    cssOverride={{
                                        borderWidth: '3px',
                                        zIndex: '10',
                                        marginRight: '8px',
                                    }}
                                    size={20}
                                />
                                Go to your wallet and confirm this bid from your
                                wallet.
                            </div>
                        ) : (
                            'Place bid'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaceABidModal;
