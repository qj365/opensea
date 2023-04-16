import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import diffDay from '../../utils/diffDay';
import { Tooltip, ToggleSwitch } from 'flowbite-react';
import { formatToUSDate } from '../../utils/formatDate';
import TextInput from '../common/TextInput';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import validateLogin from '../../utils/validateLogin';
import { APPROVE_OFFER } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';
import Decimal from 'decimal.js';
import { useRouter } from 'next/router';

function ApproveSaleModal({
    approveOfferModalVisible,
    setApproveOfferModalVisible,
    usdPrice,
    nft,
    offer,
    notify,
    sdk,
    address,
}) {
    const router = useRouter();
    const [approveOffer] = useMutation(APPROVE_OFFER);
    const [isApprovingOffer, setIsApprovingOffer] = useState(false);
    async function handleApproveOffer() {
        try {
            if (validateLogin(address)) {
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );
                setIsApprovingOffer(true);

                if (contract) {
                    const txResult = await contract.offers.acceptOffer(
                        offer.eventId
                    );

                    // check variable
                    const { data } = await approveOffer({
                        variables: {
                            event: {
                                eventId: offer.eventId,
                                creator: address.toLowerCase(),
                                from: address.toLowerCase(),
                                to: offer.creator._id.toLowerCase(),
                                startTimestamp: new Date(),
                                transactionHash:
                                    txResult.receipt.transactionHash,
                            },
                            offerId: offer._id,
                            collectionNft: nft.collectionNft._id,
                            tokenId: nft.tokenId,
                        },
                    });

                    notify('success', undefined, 'Approve sale success');

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            notify('error', 'Approve sale failed');
            setIsApprovingOffer(false);
        }
    }
    return (
        <div
            className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                true ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'
            }`}
        >
            <div className="bg-[#262b2f] w-[700px] rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center pt-8 pb-4 px-6 border-[1px] border-[#353840]">
                    <h4 className="text-white text-2xl font-semibold">
                        Approve sale
                    </h4>
                    <MdClose
                        className="text-[#8a939b] text-2xl hover:text-[#646d75] cursor-pointer"
                        onClick={() => {
                            setApproveOfferModalVisible(false);
                            document.body.style.overflowY = 'auto';
                            setIsApprovingOffer(false);
                        }}
                    />
                </div>
                <div className="flex items-center px-6 py-4">
                    <div className="w-[72px] h-[72px] relative rounded-[4px] overflow-hidden mr-4">
                        <div className="relative inset-0 w-full h-full flex items-center justify-center z-10 opacity-40">
                            {/* <ClipLoader
                                loading={true}
                                color={'#ffffff'}
                                cssOverride={{
                                    borderWidth: '5px',
                                    zIndex: '10',
                                }}
                                size={40}
                            /> */}
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
                        <p className="text-[#8a939b] text-sm font-normal">
                            Offer price
                        </p>
                        <p className="text-white text-base font-semibold">
                            {offer.price + ' '} WETH
                        </p>
                        <p className="text-[#8a939b] text-sm font-normal">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(offer.price * usdPrice.WETH)}{' '}
                            USD
                        </p>
                    </div>
                </div>
                <hr className="border-[1px] border-[#353840] " />
                <div className="h-auto overflow-y-hidden">
                    <div className="px-6 my-6">
                        <p className="text-white font-semibold">
                            Offer details
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-white">From</p>
                            <Link href={`/${offer.creator._id.toLowerCase()}`}>
                                <a className="text-[#2081e2] hover:text-[#1868b7]">
                                    {offer.creator.username === 'Unnamed'
                                        ? offer.creator._id
                                              .slice(-6)
                                              .toUpperCase()
                                        : offer.creator.username}
                                </a>
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-white">Expiration</p>
                            <Tooltip
                                content={formatToUSDate(offer.endTimestamp)}
                            >
                                <p className="text-white">
                                    {diffDay(
                                        new Date(),
                                        new Date(parseInt(offer.endTimestamp)),
                                        'in '
                                    )}
                                </p>
                            </Tooltip>
                        </div>
                    </div>
                    <hr className="border-[1px] border-[#353840] " />
                    <div className="px-6 my-6">
                        <p className="text-white font-semibold ">Fees</p>
                        <div className="flex items-center justify-between ">
                            <p className="text-white">Service fee</p>
                            <p className="text-white">
                                {process.env.NEXT_PUBLIC_MARKETPLACE_SHARE}%
                            </p>
                        </div>
                        <div className="flex items-center justify-between ">
                            <p className="text-white">Creator earnings</p>
                            <p className="text-white">
                                {nft.collectionNft?.royalty?.percentage || 0}%
                            </p>
                        </div>
                    </div>
                    <hr className="border-[1px] border-[#353840] " />
                    <div className="px-6 my-6">
                        <div className="flex items-center justify-between text-white font-semibold">
                            <p>Total earnings</p>
                            <p>
                                {`${new Decimal(offer.price)
                                    .dividedBy(100)
                                    .times(
                                        new Decimal(100)
                                            .minus(
                                                new Decimal(
                                                    process.env.NEXT_PUBLIC_MARKETPLACE_SHARE
                                                )
                                            )
                                            .minus(
                                                new Decimal(
                                                    nft.collectionNft?.royalty
                                                        ?.percentage || 0
                                                )
                                            )
                                    )} WETH`}
                            </p>
                        </div>
                        <div className="flex items-center justify-end">
                            <p className="text-[#8a939b] text-sm font-normal">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(
                                    (offer.price / 100) *
                                        (100 -
                                            process.env
                                                .NEXT_PUBLIC_MARKETPLACE_SHARE -
                                            (nft.collectionNft?.royalty
                                                ?.percentage || 0)) *
                                        usdPrice.WETH
                                )}{' '}
                                USD
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-6 my-6 w-full">
                    <button
                        className={`w-full text-base font-semibold tracking-[0.01em] py-[17px] px-6 bg-[#2081e2] border border-transparent text-white rounded-xl  ${
                            !isApprovingOffer
                                ? 'hover:bg-[#2e8eee]'
                                : 'opacity-40 hover:bg-inherit'
                        }'}`}
                        disabled={isApprovingOffer}
                        onClick={handleApproveOffer}
                    >
                        {isApprovingOffer ? (
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
                                Go to your wallet and confirm this sale from
                                your wallet.
                            </div>
                        ) : (
                            'Approve'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApproveSaleModal;
