import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import { MdAccountBalanceWallet, MdClose } from 'react-icons/md';
import TextInput from '../common/TextInput';
import Select from 'react-select';
import { useSDK, useAddress, useBalance } from '@thirdweb-dev/react';
import { useQuery } from '@apollo/client';
import { GET_BEST_OFFER } from '../../graphql/query';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, DEACTIVE_EVENT } from '../../graphql/mutation';
import validateLogin from '../../utils/validateLogin';
import { useRouter } from 'next/router';

const options = [
    { value: '12', label: '12 hours' },
    { value: '24', label: '1 day' },
    { value: '72', label: '3 days' },
    { value: '168', label: '7 days' },
    { value: '720', label: '1 month' },
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

function MakeOfferModal({
    makeOfferModalVisible,
    setMakeOfferModalVisible,
    nft,
    usdPrice,
    notify,
    address,
    sdk,
}) {
    const router = useRouter();
    const { data: bestOffer } = useQuery(GET_BEST_OFFER, {
        variables: {
            collectionNft: nft.collectionNft._id,
            tokenId: nft.tokenId,
        },
    });
    const [isMakingOffer, setIsMakingOffer] = useState(false);
    const [createEvent] = useMutation(CREATE_EVENT);
    const [deactiveEvent] = useMutation(DEACTIVE_EVENT);
    const [selectedOption, setSelectedOption] = useState(options[1]);
    function handleSelectDate(e) {
        setSelectedOption(e);
    }

    const [price, setPrice] = useState('');
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
    useEffect(() => {
        if (wethBalance) {
            if (parseFloat(wethBalance.displayValue) < parseFloat(price)) {
                console.log(wethBalance, price);
                setGtError("You don't have enough WETH");
            } else {
                setGtError('');
            }
        }
    }, [price, wethBalance]);

    async function handleMakeOffer() {
        try {
            if (validateLogin(address)) {
                setIsMakingOffer(true);
                const contract = await sdk.getContract(
                    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
                    'marketplace-v3'
                );

                if (contract) {
                    const inputContract = {
                        assetContractAddress: nft.collectionNft._id,
                        tokenId: nft.tokenId,
                        totalPrice: parseFloat(price),
                        currencyContractAddress:
                            process.env.NEXT_PUBLIC_WETH_ADDRESS,
                        endTimestamp: new Date(
                            new Date().getTime() +
                                selectedOption.value * 60 * 60 * 1000
                        ),
                    };

                    const txResult = await contract.offers.makeOffer(
                        inputContract
                    );

                    const input = {
                        eventId: parseInt(txResult.id._hex, 16),
                        eventType: 'direct',
                        eventName: 'Offer',
                        active: true,
                        creator: address.toLowerCase(),
                        assetContract: inputContract.assetContractAddress,
                        from: address.toLowerCase(),
                        tokenId: inputContract.tokenId,
                        currency: 'WETH',
                        price: inputContract.totalPrice,
                        startTimestamp: new Date(),
                        endTimestamp: inputContract.endTimestamp,
                        transactionHash: txResult.receipt.transactionHash,
                    };
                    const { data } = await createEvent({
                        variables: {
                            input,
                        },
                    });

                    notify('success', undefined, 'Offer created!');

                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                } else throw new Error('Contract not found');
            } else {
                router.push('/login');
            }
        } catch (err) {
            console.log('message', err);
            notify('error', 'Offer failed');
            // setIsApproving(false);
            setIsMakingOffer(false);
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                makeOfferModalVisible ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'
            }`}
        >
            <div className="bg-[#262b2f] w-[700px] rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center pt-8 pb-4 px-6 border-[1px] border-[#353840]">
                    <h4 className="text-white text-2xl font-semibold">
                        Make an offer
                    </h4>
                    <MdClose
                        className="text-[#8a939b] text-2xl hover:text-[#646d75] cursor-pointer"
                        onClick={() => {
                            setMakeOfferModalVisible(false);
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
                                bestOffer?.getBestOffer
                                    ? bestOffer.getBestOffer.price
                                    : '--'
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
                                {gtError}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-white font-semibold">Duration</p>
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
                    </div>
                </div>
                <div className="p-6">
                    <button
                        className={`w-full text-base font-semibold tracking-[0.01em] py-[17px] px-6 bg-[#2081e2] border border-transparent text-white rounded-xl  ${
                            Boolean(parseFloat(price)) &&
                            !gtError &&
                            !isMakingOffer
                                ? 'hover:bg-[#2e8eee]'
                                : 'opacity-40 hover:bg-inherit'
                        }'}`}
                        disabled={
                            !Boolean(parseFloat(price)) ||
                            gtError ||
                            isMakingOffer
                        }
                        onClick={handleMakeOffer}
                    >
                        {isMakingOffer ? (
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
                                Go to your wallet and confirm this offer from
                                your wallet.
                            </div>
                        ) : (
                            'Make offer'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MakeOfferModal;
