import { useEffect, useState } from 'react';
import requireAuthentication from '../../components/layout/withAuth';
import { MdImage, MdError } from 'react-icons/md';
import TextInput from '../../components/common/TextInput';
import {
    useSigner,
    useSDK,
    useContract,
    useMintNFT,
    useAddress,
    useContractMetadata,
    useMetadata,
} from '@thirdweb-dev/react';
import Select, { components } from 'react-select';
import Image from 'next/image';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    GET_COLLECTION_BY_NAME,
    GET_COLLECTION_BY_QUERY,
} from '../../graphql/query';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';
import uploadImage from '../../utils/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_COLLECTION } from '../../graphql/mutation';
import { useRouter } from 'next/router';
import slug from 'slug';
import ClipLoader from 'react-spinners/ClipLoader';
import { CREATE_NFT, CREATE_EVENT } from '../../graphql/mutation';

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
        fontWeight: '500',
    }),
    option: (baseStyles, state) => ({
        padding: '10px 15px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#4c505c',
        },
    }),
    input: baseStyles => ({
        ...baseStyles,
        opacity: 0,
    }),
    singleValue: baseStyles => ({
        ...baseStyles,
        color: 'white',
        fontWeight: '500',
    }),
};

function CreateAssetPage() {
    const [getCollectionsByQuery] = useLazyQuery(GET_COLLECTION_BY_NAME);
    const [createCollection] = useMutation(CREATE_COLLECTION);
    const [createNft] = useMutation(CREATE_NFT);
    const [createEvent] = useMutation(CREATE_EVENT);

    const { data } = useQuery(GET_COLLECTION_BY_QUERY, {
        variables: {
            query: `owner=${Cookies.get('__user_address')?.toLowerCase()}`,
        },
    });

    const collections = data?.getAllCollections.map(collection => {
        return {
            value: collection._id,
            label: collection.name,
            image: collection.logoImage,
        };
    });

    const sdk = useSDK();

    const address = useAddress();

    const router = useRouter();

    const [nftData, setNftData] = useState({
        media: null,
        name: '',
        description: '',
        link: '',
        collectionNft: '',
    });

    const [errors, setErrors] = useState({});
    const [submittingForm, setSubmittingForm] = useState(false);

    const notify = status => {
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
        if (status === 'success') toast.success('Created!', settingToast);
        else toast.error('Something went wrong!', settingToast);
    };

    function handleNftDataChange(e) {
        const { value, id, type } = e.target;
        if (type === 'file') {
            setNftData({ ...nftData, [id]: e.target.files[0] });

            return;
        }
        setNftData({ ...nftData, [id]: value });
    }

    async function handleValidation() {
        let formIsValid = true;
        let errors = {};

        if (!nftData.media) {
            formIsValid = false;
            errors['media'] = 'Media cannot be empty';
        }

        if (!nftData.name) {
            formIsValid = false;
            errors['name'] = "NFT's name cannot be empty";
        }

        if (!nftData.collectionNft) {
            formIsValid = false;
            errors['collectionNft'] = 'Collection cannot be empty';
        }

        setErrors(errors);

        return formIsValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(nftData);
        if (address && address !== Cookies.get('__user_address')) {
            window.location.href = '/login';
        } else {
            setSubmittingForm(true);

            try {
                if (handleValidation()) {
                    document.body.style.overflowY = 'hidden';
                    setSubmittingForm(true);
                    const mediaUrl = await uploadImage(nftData.media, 'nfts');
                    const contract = await sdk.getContract(
                        nftData.collectionNft
                    );
                    const metadata = {
                        name: nftData.name,
                        description: nftData.description,
                        image: mediaUrl,
                        external_url: nftData.link,
                    };
                    const tx = await contract.erc721.mint(metadata);
                    console.log(tx);

                    const { data } = await createNft({
                        variables: {
                            input: {
                                ...nftData,
                                tokenId: parseInt(tx.id._hex, 16),
                                media: mediaUrl,
                                creator: address.toLowerCase(),
                                owner: address.toLowerCase(),
                            },
                        },
                    });

                    const { data: eventData } = await createEvent({
                        variables: {
                            input: {
                                eventType: 'mint',
                                eventName: 'Mint',
                                creator: address.toLowerCase(),
                                assetContract:
                                    nftData.collectionNft.toLowerCase(),
                                from: '0x0000000000000000000000000000000000000000',
                                to: address.toLowerCase(),
                                tokenId: parseInt(tx.id._hex, 16),
                                startTimestamp: new Date(),
                                transactionHash: tx.receipt.transactionHash,
                            },
                        },
                    });

                    router.push(`/assets/${nftData.collectionNft}/${tx.id}`);
                }
            } catch (err) {
                console.log(err);
                notify('error');
            }

            document.body.style.overflowY = 'auto';
            setSubmittingForm(false);
        }
    }

    return (
        <>
            <div className="w-[646px] max-w-full h-[100vh] mx-auto pt-10">
                <h1 className="py-6 text-white font-semibold text-[40px]">
                    Create New Item
                </h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="text-white mb-6">
                        <label htmlFor="media" className="font-semibold mb-1">
                            Image, Video, Audio, or 3D Model *
                        </label>
                        <p>
                            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM,
                            MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-[10px] h-[200px] w-[300px] flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('media').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="media"
                                onChange={e => {
                                    handleNftDataChange(e);
                                }}
                            />
                            {nftData.media && (
                                <Image
                                    src={URL.createObjectURL(nftData.media)}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="media"
                                />
                            )}

                            <MdImage className="text-[#cccccc] text-[84px] z-[5] opacity-0 group-hover:opacity-100" />
                            <div className="absolute inset-0 z-[15] h-full bg-[#00000099] opacity-0 group-hover:opacity-100 "></div>
                        </div>
                    </div>

                    <div className="text-white mb-6">
                        <TextInput
                            label="Name *"
                            id="name"
                            placeholder="Item name"
                            inputCss="w-full"
                            onChange={e => {
                                handleNftDataChange(e);
                            }}
                            value={nftData.name}
                        />
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor={'collectionNft'}
                            className={`block text-base font-semibold text-[#e5e8eb] pb-2 `}
                        >
                            Collection *
                        </label>
                        <Select
                            placeholder="Select a collection"
                            name="collectionNft"
                            id="collectionNft"
                            options={collections}
                            formatOptionLabel={collection => (
                                <div className="flex items-center">
                                    <Image
                                        src={collection.image}
                                        alt={collection.label}
                                        width={30}
                                        height={30}
                                        className="rounded-full object-cover"
                                    />
                                    <span className="ml-4">
                                        {collection.label}
                                    </span>
                                </div>
                            )}
                            onChange={e => {
                                setNftData({
                                    ...nftData,
                                    collectionNft: e.value,
                                });
                            }}
                            styles={selectStyle}
                            className="react-select-container"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="text-white mb-6">
                        <TextInput
                            label="External link"
                            id="link"
                            placeholder="https://yoursite.io/item/123"
                            inputCss="w-full"
                            onChange={e => {
                                handleNftDataChange(e);
                            }}
                            value={nftData.link}
                        />
                    </div>

                    <div className="text-white mb-6">
                        <label
                            htmlFor="description"
                            className={`block text-base font-semibold text-[#e5e8eb] pb-2`}
                        >
                            Description
                        </label>
                        <textarea
                            rows={4}
                            type="text"
                            id="description"
                            className={`w-full rounded-xl border-2 border-[#4c505c] py-[10px] px-4 bg-transparent text-white hover:border-[#8a939b] focus:border-[#8a939b] without-ring transition-colors ease-in-out duration-[250]`}
                            placeholder="Tell the world your story"
                            onChange={e => {
                                handleNftDataChange(e);
                            }}
                            value={nftData.description}
                        />
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6">
                            {Object.values(errors).map((error, index) => (
                                <div
                                    className="text-sm text-red-500 flex items-center"
                                    key={index}
                                >
                                    <MdError className="mr-2" />
                                    <span>{error}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        className="mb-8 text-white text-base font-semibold py-[17px] px-[24px] bg-[#2081e2] rounded-xl hover:bg-[#2e8eee]"
                        type="submit"
                        disabled={submittingForm}
                    >
                        {submittingForm ? <Spinner /> : 'Create'}
                    </button>
                    <ToastContainer />
                </form>

                <button
                    onClick={async () => {
                        const contract = await sdk.getContract(
                            '0xD7F21C64047E79C03C447d3b672A264808d03d84'
                        );

                        const events = await contract.events.getAllEvents();

                        const nft = await contract.erc721.get(2);
                        console.log(events, nft);
                    }}
                >
                    button
                </button>
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

export default CreateAssetPage;

export const getServerSideProps = requireAuthentication(async context => {
    return {
        props: {},
    };
});
