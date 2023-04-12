import { useState, useEffect, useRef } from 'react';
import requireAuthentication from '../../../../components/layout/withAuth';
import client from '../../../../graphql/apollo-client';
import { GET_NFT_ASSET_PAGE } from '../../../../graphql/query';
import {
    MdCalendarToday,
    MdExpandLess,
    MdExpandMore,
    MdKeyboardArrowLeft,
} from 'react-icons/md';
import TextInput from '../../../../components/common/TextInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker/dist/entry.nostyle';
import Image from 'next/image';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import { UPDATE_LISTING, CREATE_EVENT } from '../../../../graphql/mutation';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import validateLogin from '../../../../utils/validateLogin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

const options = [
    { value: '1', label: '1 day' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' },
    { value: '30', label: '1 month' },
    { value: '90', label: '3 months' },
];

const notify = (status, errorMessage = 'Something went wrong!') => {
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
    if (status === 'success') toast.success('Success!', settingToast);
    else toast.error(errorMessage, settingToast);
};

const selectStyle = {
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
        backgroundColor: '#262b2f',
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

function SellPage({ nft }) {
    const [selectedType, setSelectedType] = useState('fixed');
    const [selectedCurrency, setSelectedCurrency] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [reservePrice, setReversePrice] = useState('');

    const [dateValue, onChangeDateValue] = useState([
        new Date(),
        new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    ]);

    const [isOpenDate, setIsOpenDate] = useState(false);
    const [usdPrice, setUsdPrice] = useState({
        ETH: 0,
        WETH: 0,
    });

    const address = useAddress();
    const router = useRouter();
    const { contractAddress, tokenId } = router.query;

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

    const dropdownRef = useRef(null);

    function handleClickOutside(event) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpenDate(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function handleSelectType(e) {
        setSelectedType(e.target.id);
        setAmount('');
        if (e.target.id === 'auction') setSelectedCurrency('WETH');
        else setSelectedCurrency('ETH');
    }
    function handleSelectCurrency(e) {
        setSelectedCurrency(e.target.id);
    }

    function handleChangePrice(e) {
        const regex = /^\d+(\.\d*)?$/;

        if (e.target.value === '' || regex.test(e.target.value)) {
            setAmount(e.target.value);
        }
    }

    function handleChangeReservePrice(e) {
        const regex = /^(0|[1-9]\d*)(\.\d+)?$/;

        if (e.target.value === '' || regex.test(e.target.value)) {
            setReversePrice(e.target.value);
        }
    }

    const [selectedOption, setSelectedOption] = useState(options[3]);
    function handleSelectDate(e) {
        setSelectedOption(e);
        const NOW = new Date();
        onChangeDateValue([
            NOW,
            new Date(NOW.getTime() + e.value * 24 * 60 * 60 * 1000),
        ]);
    }

    function handleRangeChange(e) {
        onChangeDateValue(e);
        if (e) {
            const diffTime = Math.abs(e[1] - e[0]);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let label = '';
            if (diffDays === 0) label = '0 day';
            else if (diffDays === 1) label = '1 day';
            else label = `${diffDays} days`;
            setSelectedOption({ value: diffDays, label });
        }
    }

    const [updateListing] = useMutation(UPDATE_LISTING);
    const [createEvent] = useMutation(CREATE_EVENT);
    const [submittingForm, setSubmittingForm] = useState(false);
    const sdk = useSDK();
    async function handleListing(e) {
        e.preventDefault();
        if (validateLogin(address)) {
            const validListings = nft.events.filter(
                event =>
                    (event.eventType === 'fixed' ||
                        event.eventType === 'auction') &&
                    event.active &&
                    event.endTimestamp > Date.now()
            );
            if (nft.isListing) {
                const eventType = validListings[0].eventType;
                if (eventType !== selectedType)
                    return notify('error', 'One type of listing at a time');
                if (selectedType === 'auction')
                    return notify('error', 'One auction listing at a time');
            }
            try {
                document.body.style.overflowY = 'hidden';
                setSubmittingForm(true);

                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3' // Provide the "marketplace-v3" contract type
                );
                let txResult;

                if (selectedType === 'fixed') {
                    txResult = await contract.directListings.createListing({
                        assetContractAddress: nft.collectionNft._id, // Required - smart contract address of NFT to sell
                        tokenId: nft.tokenId, // Required - token ID of the NFT to sell
                        pricePerToken: amount, // Required - price of each token in the listing
                        currencyContractAddress:
                            selectedCurrency === 'ETH'
                                ? process.env.NEXT_PUBLIC_ETH_ADDRESS
                                : process.env.NEXT_PUBLIC_WETH_ADDRESS, // Optional - smart contract address of the currency to use for the listing
                        startTimestamp: dateValue[0], // Optional - when the listing should start (default is now)
                        endTimestamp: dateValue[1], // Optional - when the listing should end (default is 7 days from now)
                    });
                } else if (selectedType === 'auction') {
                    txResult = await contract.englishAuctions.createAuction({
                        assetContractAddress: nft.collectionNft._id, // Required - smart contract address of NFT to sell
                        tokenId: nft.tokenId, // Required - token ID of the NFT to sell
                        buyoutBidAmount: 9999, // Required - amount to buy the NFT and close the listing
                        minimumBidAmount: amount, // Required - Minimum amount that bids must be to placed
                        currencyContractAddress:
                            process.env.NEXT_PUBLIC_WETH_ADDRESS,
                        startTimestamp: dateValue[0],
                        endTimestamp: dateValue[1],
                        bidBufferBps: 500,
                        timeBufferInSeconds: 60 * 10,
                    });
                }
                // const updateData = {
                //     _id: parseInt(txResult.id._hex, 16),
                //     isListing: true,
                //     type: selectedType,
                //     price: parseFloat(amount),
                //     currency: selectedCurrency,
                //     startDate: dateValue[0],
                //     endDate: dateValue[1],
                // };

                // const { data } = await updateListing({
                //     variables: {
                //         updateNftId: nft._id,
                //         input: {
                //             listing: {
                //                 ...updateData,
                //             },
                //         },
                //     },
                // });
                const input = {
                    eventType: selectedType,
                    eventName: 'Listing',
                    creator: address.toLowerCase(),
                    assetContract: nft.collectionNft._id,
                    from: address.toLowerCase(),
                    tokenId: nft.tokenId,
                    startTimestamp: dateValue[0],
                    endTimestamp: dateValue[1],
                    transactionHash: txResult.receipt.transactionHash,
                    eventId: parseInt(txResult.id._hex, 16),
                    currency: selectedCurrency,
                    price: parseFloat(amount),
                };
                const { data } = await createEvent({ variables: { input } });

                notify('success');
                setTimeout(() => {
                    router.push(`/assets/${contractAddress}/${tokenId}`);
                }, 1500);
            } catch (err) {
                console.log(err);

                notify('error');
            }
        } else {
            console.log('logimn');
            router.push('/login');
        }
        setSubmittingForm(false);
        document.body.style.overflowY = 'auto';
    }

    return (
        <>
            <div className="w-[80%] mx-auto flex justify-center gap-x-[80px]">
                <form className="w-[520px]" onSubmit={handleListing}>
                    <div className="flex items-center my-10">
                        <Link href={`/assets/${contractAddress}/${tokenId}`}>
                            <a>
                                <MdKeyboardArrowLeft className="text-[#8a939b] text-[28px] mr-[20px] hover:text-white cursor-pointer" />
                            </a>
                        </Link>
                        <h1 className="font-bold text-white text-[32px] ">
                            List for sale
                        </h1>
                    </div>

                    <div className="w-full mb-[40px]">
                        <h2 className="text-white font-semibold text-[20px] mb-4">
                            Choose a type of sale
                        </h2>
                        <label
                            className="w-full flex items-center justify-between p-4 rounded-2xl cursor-pointer border-[1px] border-[#4c505c] hover:border-[#8a939b]"
                            htmlFor="fixed"
                            onChange={handleSelectType}
                        >
                            <div>
                                <p className="text-white text-base font-semibold mb-1">
                                    Fixed price
                                </p>
                                <p className="text-[#84939b] text-base">
                                    The item is listed at the price you set.
                                </p>
                            </div>
                            <input
                                id="fixed"
                                type="radio"
                                className="appearance-none border-2 border-[#4c505c] bg-[#202225] h-6 w-6 rounded-full outline-none ml-6 without-ring cursor-pointer"
                                checked={selectedType === 'fixed'}
                                onChange={handleSelectType}
                            ></input>
                        </label>
                        <label
                            className="w-full flex items-center justify-between p-4 rounded-2xl cursor-pointer border-[1px] border-[#4c505c] hover:border-[#8a939b] mt-4"
                            htmlFor="auction"
                            onChange={handleSelectType}
                        >
                            <div>
                                <p className="text-white text-base font-semibold mb-1">
                                    Timed auction
                                </p>
                                <p className="text-[#84939b] text-base">
                                    The item is listed for auction.
                                </p>
                            </div>
                            <input
                                id="auction"
                                type="radio"
                                className="appearance-none border-2 border-[#4c505c] bg-[#202225] h-6 w-6 rounded-full outline-none ml-6 without-ring cursor-pointer"
                                checked={selectedType === 'auction'}
                                onChange={handleSelectType}
                            ></input>
                        </label>
                    </div>

                    <div className="w-full mb-10">
                        <h2 className="text-white font-semibold text-[20px] mb-4">
                            Set a price
                        </h2>
                        <div className="flex items-center">
                            {selectedType === 'fixed' ? (
                                <div className="w-full flex items-end mb-4">
                                    <div className="w-full">
                                        <TextInput
                                            placeholder="Amount"
                                            type="number"
                                            inputCss="no-spin-buttons w-full pr-20"
                                            id="price"
                                            onChange={e => handleChangePrice(e)}
                                            value={amount}
                                        />
                                    </div>
                                    <span className="text-white font-semibold text-base w-0 relative right-20 bottom-3  ">
                                        <span className="border-r-[1px] border-[4c505c] mr-2"></span>
                                        ETH
                                    </span>
                                </div>
                            ) : (
                                <div className="w-full">
                                    <div className="w-full flex items-end mb-4">
                                        <div className="w-full">
                                            <TextInput
                                                placeholder="Amount"
                                                type="number"
                                                label="Starting price"
                                                inputCss="no-spin-buttons w-full pr-20"
                                                id="price"
                                                onChange={e =>
                                                    handleChangePrice(e)
                                                }
                                                value={amount}
                                            />
                                        </div>
                                        <span className="text-white font-semibold text-base w-0 relative right-20 bottom-3  ">
                                            <span className="border-r-[1px] border-[4c505c] mr-2"></span>
                                            WETH
                                        </span>
                                    </div>
                                </div>
                            )}
                            {/* {selectedType === 'fixed' && (
                                <>
                                    <span className="inline-flex items-center">
                                        <input
                                            id="ETH"
                                            type="radio"
                                            className="appearance-none border-2 border-[#4c505c] bg-[#202225] h-6 w-6 rounded-full outline-none ml-6 without-ring mr-2 cursor-pointer"
                                            checked={selectedCurrency === 'ETH'}
                                            onChange={handleSelectCurrency}
                                        ></input>
                                        <label
                                            htmlFor="ETH"
                                            className="text-white font-semibold text-base"
                                        >
                                            ETH
                                        </label>
                                    </span>
                                    <span className="inline-flex items-center">
                                        <input
                                            id="WETH"
                                            type="radio"
                                            className="appearance-none border-2 border-[#4c505c] bg-[#202225] h-6 w-6 rounded-full outline-none ml-6 without-ring mr-2 cursor-pointer"
                                            checked={
                                                selectedCurrency === 'WETH'
                                            }
                                            onChange={handleSelectCurrency}
                                        ></input>
                                        <label
                                            htmlFor="WETH"
                                            className="text-white font-semibold text-base"
                                        >
                                            WETH
                                        </label>
                                    </span>
                                </>
                            )} */}
                        </div>
                        {amount && (
                            <div className="text-sm text-[#8a939b]">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(
                                    usdPrice[selectedCurrency] * amount
                                )}{' '}
                                Total
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-10">
                        <h2 className="text-white font-semibold text-[20px] mb-4">
                            Set duration
                        </h2>
                        <div ref={dropdownRef}>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpenDate(!isOpenDate);
                                }}
                                className="text-white font-medium w-full p-3 flex items-center rounded-xl text-base bg-[#353840] border-[1px] border-[#353840] hover:bg-[#4c505c] hover:border-transparent"
                            >
                                <MdCalendarToday className="text-white text-[24px] mr-3" />
                                <div className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis text-left">
                                    {selectedOption.label}
                                </div>
                                {isOpenDate ? (
                                    <MdExpandLess className="text-white text-[24px] ml-3" />
                                ) : (
                                    <MdExpandMore className="text-white text-[24px] ml-3" />
                                )}
                            </button>
                            {isOpenDate && (
                                <div className="relative z-10">
                                    <div className="w-[110%] absolute mt-2 bg-[#353840] rounded-xl ">
                                        <div className="flex flex-col justify-center px-[17px] py-8">
                                            <div className="mb-4">
                                                <label className="text-white text-base font font-semibold block mb-2">
                                                    Date range
                                                </label>
                                                <Select
                                                    placeholder="Date range"
                                                    isClearable={false}
                                                    defaultValue={options[3]}
                                                    name="colors"
                                                    options={options}
                                                    styles={selectStyle}
                                                    className="react-select-container"
                                                    classNamePrefix="select"
                                                    onChange={handleSelectDate}
                                                    value={selectedOption}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white text-base font font-semibold block mb-2">
                                                    Select date time
                                                </label>
                                                <DateTimeRangePicker
                                                    onChange={handleRangeChange}
                                                    value={dateValue}
                                                    format={'dd/MM/yyyy HH:mm'}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full mb-10">
                        <h2 className="text-white font-semibold text-[20px] mb-4">
                            Summary
                        </h2>
                        <div className="text-white text-base mb-2 flex justify-between">
                            <div>Listing price</div>
                            <div>{`${
                                amount ? amount : '--'
                            } ${selectedCurrency}`}</div>
                        </div>
                        <div className="text-white text-base mb-2 flex justify-between">
                            <div>Service fee</div>
                            <div>2.5%</div>
                        </div>
                        <div className="text-white text-base mb-2 flex justify-between">
                            <div>Creator earnings</div>
                            <div>{`${
                                nft?.collectionNft?.royalty?.percentage
                                    ? nft?.collectionNft?.royalty?.percentage
                                    : '0'
                            } %`}</div>
                        </div>
                        <hr className="my-6 border-t-[1px] border-[#8a939b] opacity-20" />
                        <div className="text-white text-xl font-semibold mb-2 flex justify-between">
                            <div>Potential earnings</div>
                            <div>
                                <div>{`${
                                    amount
                                        ? parseFloat(
                                              (
                                                  (amount / 100) *
                                                  (100 -
                                                      2.5 -
                                                      (nft?.collectionNft
                                                          ?.royalty?.percentage
                                                          ? nft?.collectionNft
                                                                ?.royalty
                                                                ?.percentage /
                                                            100
                                                          : 0))
                                              ).toPrecision(4)
                                          )
                                        : '--'
                                } ${selectedCurrency}`}</div>
                                {amount && (
                                    <div className="text-sm text-[#8a939b] font-medium">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(
                                            usdPrice[selectedCurrency] *
                                                parseFloat(
                                                    (
                                                        (amount / 100) *
                                                        (100 -
                                                            2.5 -
                                                            (nft?.collectionNft
                                                                ?.royalty
                                                                ?.percentage
                                                                ? nft
                                                                      ?.collectionNft
                                                                      ?.royalty
                                                                      ?.percentage /
                                                                  100
                                                                : 0))
                                                    ).toPrecision(4)
                                                )
                                        )}{' '}
                                        USD
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full mb-10 rounded-xl text-white text-base font-semibold tracking-[0.01] px-6 py-[17px] bg-[#2081e2] ${
                            amount && 'hover:bg-[#2e8eee]'
                        } ${!amount && 'opacity-40'}`}
                        disabled={!amount}
                    >
                        Complete listing
                    </button>
                </form>
                <div className="my-10 ">
                    <div className="sticky top-28 w-[375px] rounded-xl mb-6 overflow-hidden bg-[#353840]">
                        <div className="w-full h-[375px] overflow-hidden relative">
                            <Image
                                src={nft?.media}
                                layout="fill"
                                objectFit="contain"
                                alt="nft"
                            />
                        </div>
                        <div className="px-4 py-3 transition ease-in-out duration-400 ">
                            <div className="w-[80%]">
                                <p className="text-white font-semibold text-base truncate tracking-[0.1px]">
                                    {nft.name}
                                </p>
                                <Link
                                    href={`/collection/${nft.collectionNft.slug}`}
                                >
                                    <a className="text-[#8a939b] hover:text-[#e5e8eb] font-normal text-base truncate tracking-[0.1px]">
                                        {nft?.collectionNft?.name}
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-3 text-xl font-semibold text-white">
                                <div>{`${
                                    amount ? amount : '--'
                                } ${selectedCurrency}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <div
                className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                    submittingForm ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'
                }`}
            >
                <div className="bg-[#262b2f] p-16 w-[500px] flex flex-col items-center rounded-[10px]">
                    <h1 className="text-white font-semibold text-3xl pb-6">
                        Please wait ...
                    </h1>
                    <ClipLoader
                        color="#2081e2"
                        loading={submittingForm}
                        cssOverride={{
                            borderWidth: '3px',
                        }}
                        size={50}
                    />
                </div>
            </div>
        </>
    );
}

export default SellPage;

export const getServerSideProps = requireAuthentication(async context => {
    const { contractAddress, tokenId } = context.params;
    //get cookie from context
    const { data } = await client.query({
        query: GET_NFT_ASSET_PAGE,
        variables: {
            collectionNft: contractAddress.toLowerCase(),
            tokenId: parseInt(tokenId),
        },
        fetchPolicy: 'network-only',
    });
    if (!data) {
        return {
            notFound: true,
        };
    }
    const { __user_address } = context.req.cookies;
    if (data.getNftAssetPage.owner._id !== __user_address.toLowerCase()) {
        if (__user_address) {
            console.log('you are not the owner');
            return {
                notFound: true,
            };
        } else {
            return {
                redirect: {
                    destination: `/login`,
                    permanent: false,
                },
            };
        }
    }
    return {
        props: { nft: data.getNftAssetPage },
    };
});
