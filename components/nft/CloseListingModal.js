import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import diffDay from '../../utils/diffDay';
import { Tooltip, ToggleSwitch } from 'flowbite-react';
import { formatToUSDate } from '../../utils/formatDate';
import TextInput from '../common/TextInput';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';

function CloseListingModal({
    closeListingModalVisible,
    setCloseListingModalVisible,
    listings,
    usdPrice,
    nft,
    isCanceling,
}) {
    return (
        <div
            className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                closeListingModalVisible
                    ? 'opacity-100 z-50'
                    : 'opacity-0 z-[-1]'
            }`}
        >
            <div className="bg-[#262b2f] w-[500px] rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center pt-8 pb-4 px-6 border-[1px] border-[#353840]">
                    <h4 className="text-white text-2xl font-semibold">
                        {listings.length == 1
                            ? 'Close listing'
                            : 'Close listings'}
                    </h4>
                    <MdClose
                        className="text-[#8a939b] text-2xl hover:text-[#646d75] cursor-pointer"
                        onClick={() => {
                            setCloseListingModalVisible(false);
                            document.body.style.overflowY = 'auto';
                        }}
                    />
                </div>
                <div className="flex items-center px-6 py-4">
                    <div className="w-[72px] h-[72px] relative rounded-[4px] overflow-hidden mr-4">
                        <div className="relative inset-0 w-full h-full flex items-center justify-center z-10 opacity-40">
                            <ClipLoader
                                loading={isCanceling}
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
                    {listings.length == 1 && (
                        <div className="flex flex-col text-right ">
                            <p className="text-[#8a939b] text-sm font-normal">
                                Listing price
                            </p>
                            <p className="text-white text-base font-semibold">
                                {nft.listing.price + ' ' + nft.listing.currency}
                            </p>
                            <p className="text-[#8a939b] text-sm font-normal">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(
                                    nft.listing.price *
                                        usdPrice[nft.listing.currency]
                                )}{' '}
                                USD
                            </p>
                        </div>
                    )}
                </div>
                <hr className="border-[1px] border-[#353840] " />
                <div className="px-6 my-6">
                    <p className="text-white text-base font-semibold ">
                        Go to your wallet
                    </p>
                    <p className="text-white text-base font-normal">
                        You&apos;ll be asked to review and confirm this
                        cancelation from your wallet.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CloseListingModal;
