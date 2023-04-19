import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import diffDay from '../../utils/diffDay';
import { Tooltip, ToggleSwitch } from 'flowbite-react';
import { formatToUSDate } from '../../utils/formatDate';
import TextInput from '../common/TextInput';
import Select from 'react-select';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutation';
import validateLogin from '../../utils/validateLogin';
import ApproveListingModal from './ApproveListingModal';
import { useRouter } from 'next/router';

const options = [
    { value: '1', label: '1 day' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' },
    { value: '30', label: '1 month' },
    { value: '90', label: '3 months' },
];
const selectStyle = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'transparent',
        padding: '4px 0',
        border: state.menuIsOpen ? 'solid 2px #8a939b' : 'solid 2px #4c505c',
        borderRadius: '10px',
        boxShadow: 'none',
        ':hover': {
            border: 'solid 2px #8a939b',
            cursor: 'pointer',
            boxShadow: 'none',
        },
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: '#303339',
        color: 'white',
    }),
    option: (baseStyles, state) => ({
        padding: '10px 15px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#4c505c',
        },
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: 'white',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '2px',
    }),

    input: baseStyles => ({
        ...baseStyles,
        opacity: 0,
    }),

    indicatorsContainer: () => {},
};

function EditListingModal({
    openListingModal,
    setOpenListingModal,
    nft,
    usdPrice,
    handleCloseListings,
    validListings,
    notify,
    isApproving,
    setIsApproving,
}) {
    const router = useRouter();
    const sdk = useSDK();
    const address = useAddress();

    const [createEvent] = useMutation(CREATE_EVENT);
    const [price, setPrice] = useState('');
    function handleChangePrice(e) {
        const regex = /^\d+(\.\d*)?$/;

        if (e.target.value === '' || regex.test(e.target.value)) {
            setPrice(e.target.value);
        }
    }

    const [checked, setChecked] = useState(true);
    const [selectedOption, setSelectedOption] = useState(options[3]);
    function handleSelectDate(e) {
        setSelectedOption(e);
    }

    function handleCloseAllListings() {
        setOpenListingModal(false);
        document.body.style.overflowY = 'auto';
        handleCloseListings(validListings);
        setErrorEditAuction('');
        setPrice('');
        setChecked(true);
    }

    function overlapListing(newListing, validListings) {
        const overlapListings = [];
        validListings.forEach(listing => {
            const range1 = {
                start: new Date(parseInt(newListing.startTimestamp)),
                end: new Date(parseInt(newListing.endTimestamp)),
            };
            const range2 = {
                start: new Date(parseInt(listing.startTimestamp)),
                end: new Date(parseInt(listing.endTimestamp)),
            };

            if (
                (range1.start <= range2.start && range2.start <= range1.end) ||
                (range1.start <= range2.end && range2.end <= range1.end)
            ) {
                overlapListings.push(listing);
            }
        });
        return overlapListings;
    }

    const [errorEditAuction, setErrorEditAuction] = useState('');
    const [approveListingModalVisible, setApproveListingModalVisible] =
        useState(false);

    const [newPrice, setNewPrice] = useState(0);
    async function handleUpdateListing() {
        try {
            if (validateLogin(address)) {
                if (nft?.listing?.eventType === 'auction') {
                    setErrorEditAuction(
                        'You cannot edit an auction. Please close it first.'
                    );
                    return;
                }
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );

                if (contract) {
                    const newListing = {
                        eventType: nft?.listing?.type,
                        eventName: 'Listing',
                        creator: address.toLowerCase(),
                        assetContract: nft.collectionNft._id,
                        from: address.toLowerCase(),
                        tokenId: nft.tokenId,
                        startTimestamp: new Date(),
                        currency: nft?.listing?.currency,
                        price: parseFloat(price),
                    };
                    if (checked) {
                        newListing.endTimestamp = new Date(
                            parseInt(nft.listing.endTimestamp)
                        );
                    } else {
                        newListing.endTimestamp = new Date(
                            new Date().getTime() +
                                parseInt(selectedOption.value) *
                                    24 *
                                    60 *
                                    60 *
                                    1000
                        );
                    }
                    if (price > nft?.listing?.price) {
                        const overlapListings = overlapListing(
                            newListing,
                            validListings
                        );
                        console.log('overlapListing:::', overlapListings);
                        if (overlapListings.length > 0) {
                            setOpenListingModal(false);
                            setErrorEditAuction('');
                            setPrice('');
                            setChecked(true);
                            await handleCloseListings(overlapListings, 1);
                        }
                    } else {
                        setApproveListingModalVisible(true);
                        setOpenListingModal(false);
                        setNewPrice(price);
                        setErrorEditAuction('');
                        setPrice('');
                        setChecked(true);
                    }
                    setIsApproving(true);

                    const txResult =
                        await contract.directListings.createListing({
                            assetContractAddress: newListing.assetContract, // Required - smart contract address of NFT to sell
                            tokenId: newListing.tokenId, // Required - token ID of the NFT to sell
                            pricePerToken: price, // Required - price of each token in the listing
                            currencyContractAddress:
                                newListing.currency === 'ETH'
                                    ? process.env.NEXT_PUBLIC_ETH_ADDRESS
                                    : process.env.NEXT_PUBLIC_WETH_ADDRESS, // Optional - smart contract address of the currency to use for the listing
                            startTimestamp: newListing.startTimestamp, // Optional - when the listing should start (default is now)
                            endTimestamp: newListing.endTimestamp, // Optional - when the listing should end (default is 7 days from now)
                        });

                    const input = {
                        ...newListing,
                        transactionHash: txResult.receipt.transactionHash,
                        eventId: parseInt(txResult.id._hex, 16),
                    };

                    const { data: eventData } = await createEvent({
                        variables: {
                            input,
                        },
                    });
                    notify('success', undefined, 'Listing updated!');
                    setIsApproving(false);

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            notify('error', 'Listing failed');
            setIsApproving(false);
        }
    }
    return (
        <>
            <ApproveListingModal
                approveListingModalVisible={approveListingModalVisible}
                setApproveListingModalVisible={setApproveListingModalVisible}
                isApproving={isApproving}
                nft={nft}
                usdPrice={usdPrice}
                newPrice={newPrice}
            />
            {nft.listing && (
                <div
                    className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                        openListingModal
                            ? 'opacity-100 z-50'
                            : 'opacity-0 z-[-1]'
                    }`}
                >
                    <div className="bg-[#262b2f] w-[500px] rounded-[10px] overflow-hidden">
                        <div className="flex justify-between items-center pt-8 pb-4 px-6 border-[1px] border-[#353840]">
                            <h4 className="text-white text-2xl font-semibold">
                                Edit listing
                            </h4>
                            <MdClose
                                className="text-[#8a939b] text-2xl hover:text-[#646d75] cursor-pointer"
                                onClick={() => {
                                    setOpenListingModal(false);
                                    document.body.style.overflowY = 'auto';
                                    setErrorEditAuction('');
                                    setPrice('');
                                    setChecked(true);
                                }}
                            />
                        </div>
                        <div className="flex items-center px-6 py-4">
                            <div className="w-[72px] h-[72px] relative rounded-[4px] overflow-hidden mr-4">
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
                                <Tooltip
                                    content={formatToUSDate(
                                        nft.listing?.endTimestamp
                                    )}
                                >
                                    <div className="text-[#e5e8eb] text-[15px]">
                                        {diffDay(
                                            new Date(),
                                            new Date(
                                                parseInt(
                                                    nft.listing?.endTimestamp
                                                )
                                            ),
                                            'in '
                                        )}
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="flex flex-col text-right ">
                                <p className="text-[#8a939b] text-sm font-normal">
                                    Listing price
                                </p>
                                <p className="text-white text-base font-semibold">
                                    {nft.listing.price + ' '} ETH
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
                        </div>
                        <div className="px-6 py-2">
                            <div className="w-full">
                                <div className="w-full flex items-end mb-4">
                                    <div className="w-full">
                                        <TextInput
                                            placeholder="Price"
                                            label="Set new price"
                                            inputCss="no-spin-buttons w-full pr-20"
                                            id="price"
                                            onChange={handleChangePrice}
                                            value={price}
                                        />
                                    </div>
                                    <span className="text-white font-semibold text-base w-0 relative right-20 bottom-3  ">
                                        <span className="border-r-[1px] border-[4c505c] mr-2"></span>
                                        {nft.listing.currency}
                                    </span>
                                </div>
                            </div>
                            <p className="text-red-500 text-sm">
                                {errorEditAuction}
                            </p>
                        </div>
                        <div className="px-6 py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-white text-base font-semibold">
                                    Use previous listing expiration date
                                </p>
                                <ToggleSwitch
                                    checked={checked}
                                    onChange={() =>
                                        setChecked(checked => !checked)
                                    }
                                    className="without-ring"
                                />
                            </div>
                            <p className="font-medium text-sm text-[#8a939b]">
                                {formatToUSDate(nft.listing?.endTimestamp)}
                            </p>
                            {!checked && (
                                <Select
                                    placeholder="Date range"
                                    isClearable={false}
                                    defaultValue={options[3]}
                                    name="colors"
                                    options={options}
                                    styles={selectStyle}
                                    className="react-select-container py-4"
                                    classNamePrefix="select"
                                    onChange={handleSelectDate}
                                    value={selectedOption}
                                    menuPortalTarget={document.body}
                                    menuPosition={'fixed'}
                                    menuPlacement={'top'}
                                />
                            )}
                        </div>
                        <div className="items-center px-6 grid grid-cols-2 gap-x-3 mt-4 mb-6">
                            <button
                                className="text-base font-semibold tracking-[0.01em] py-[17px] px-6 bg-transparent border border-red-500 text-red-500 rounded-xl hover:color-[#eb6b6b] hover:border-[#eb6b6b]"
                                onClick={handleCloseAllListings}
                            >
                                Cancle all listings
                            </button>
                            <button
                                className={`text-base font-semibold tracking-[0.01em] py-[17px] px-6 bg-[#2081e2] border border-transparent text-white rounded-xl  ${
                                    Boolean(parseFloat(price))
                                        ? 'hover:bg-[#2e8eee]'
                                        : 'opacity-40 hover:bg-inherit'
                                }'}`}
                                disabled={!Boolean(parseFloat(price))}
                                onClick={handleUpdateListing}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditListingModal;
