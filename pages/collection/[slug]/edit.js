import { useEffect, useState } from 'react';
import requireAuthentication from '../../../components/layout/withAuth';
import { MdImage, MdError, MdDeleteOutline } from 'react-icons/md';
import TextInput from '../../../components/common/TextInput';
import {
    useSigner,
    useSDK,
    useContract,
    useMintNFT,
    useAddress,
    useContractMetadata,
    useMetadata,
} from '@thirdweb-dev/react';
import Select from 'react-select';
import Image from 'next/image';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_COLLECTION_BY_QUERY,
    GET_COLLECTION_BY_NAME,
} from '../../../graphql/query';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';
import uploadImage from '../../../utils/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import slug from 'slug';
import client from '../../../graphql/apollo-client';
import { UPDATE_COLLECTION } from '../../../graphql/mutation';
import ClipLoader from 'react-spinners/ClipLoader';

const options = [
    { value: 'Art', label: 'Art' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'PFP', label: 'PFP' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Sport', label: 'Sport' },
    { value: 'Music', label: 'Music' },
];

function EditCollection({ collection, owner }) {
    const [getCollectionsByQuery] = useLazyQuery(GET_COLLECTION_BY_NAME);
    const [updateCollection] = useMutation(UPDATE_COLLECTION);

    const sdk = useSDK();

    const address = useAddress();

    const router = useRouter();

    const [collectionData, setCollectionData] = useState({
        ...collection,
    });

    const [errors, setErrors] = useState({});
    const [submittingForm, setSubmittingForm] = useState(false);

    const notify = (status, message = 'Something went wrong!') => {
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
        if (status === 'success') toast.success('Updated!', settingToast);
        else toast.error(`${message}`, settingToast);
    };

    function handleCollectionDataChange(e) {
        const { value, id, type } = e.target;
        if (type === 'file') {
            setCollectionData({ ...collectionData, [id]: e.target.files[0] });

            return;
        }
        setCollectionData({ ...collectionData, [id]: value });
    }

    async function handleValidation() {
        let formIsValid = true;
        let errors = {};

        if (!collectionData.logoImage) {
            formIsValid = false;
            errors['logoImage'] = 'Logo cannot be empty';
        }

        if (!collectionData.name) {
            formIsValid = false;
            errors['name'] = "Collection's name cannot be empty";
        } else {
            if (collectionData.name !== collection.name) {
                const { data } = await getCollectionsByQuery({
                    variables: { query: `slug=${slug(collectionData.name)}` },
                });
                if (data.getAllCollections.length > 0) {
                    formIsValid = false;
                    errors['name'] = "Collection's name already exists";
                }
            }
        }

        if (
            (!collectionData?.royalty?.creator &&
                collectionData?.royalty?.percentage) ||
            (collectionData?.royalty?.creator &&
                !collectionData?.royalty?.percentage)
        ) {
            formIsValid = false;
            errors['creatorRoyalty'] =
                "One of creator's royalty cannot be empty";
        }

        if (
            collectionData?.royalty?.creator &&
            !/^0x[a-fA-F0-9]{40}$/.test(collectionData?.royalty?.creator)
        ) {
            formIsValid = false;
            errors['creatorAddress'] = "Creator's address is not valid";
        }

        if (
            collectionData?.royalty?.percentage &&
            (parseFloat(collectionData?.royalty?.percentage) > 10 ||
                parseFloat(collectionData?.royalty?.percentage) <= 0)
        ) {
            formIsValid = false;
            errors['percentageRoyalty'] =
                'Percentage royalty cannot be less than or equal to 0% and greater than 10%';
        }

        setErrors(errors);

        return formIsValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (address && address !== Cookies.get('__user_address')) {
            window.location.href = '/login';
        } else {
            if (address !== owner) {
                return notify('error', 'You do not have permission to edit!');
            }
            const isValidate = await handleValidation();

            if (isValidate) {
                try {
                    document.body.style.overflowY = 'hidden';
                    setSubmittingForm(true);
                    let collectionUpdate = {};
                    let contractChanged = false;
                    let contractUpdate = {};
                    const creator = collectionData.royalty.creator
                        ? collectionData.royalty.creator
                        : undefined;

                    const percentage = collectionData?.royalty?.percentage
                        ? parseFloat(collectionData?.royalty?.percentage)
                        : undefined;

                    let royaltyChanged = false;

                    if (collectionData.logoImage !== collection.logoImage) {
                        contractChanged = true;
                        const logo = await uploadImage(
                            collectionData.logoImage,
                            'collections'
                        );
                        contractUpdate = {
                            ...contractUpdate,
                            image: logo,
                        };
                        collectionUpdate = {
                            ...collectionUpdate,
                            logoImage: logo,
                        };
                    }

                    if (
                        collectionData.featuredImage !==
                        collection.featuredImage
                    ) {
                        const featuredImage = await uploadImage(
                            collectionData.featuredImage,
                            'collections'
                        );
                        collectionUpdate = {
                            ...collectionUpdate,
                            featuredImage,
                        };
                    }

                    if (collectionData.bannerImage !== collection.bannerImage) {
                        const bannerImage = await uploadImage(
                            collectionData.bannerImage,
                            'collections'
                        );
                        collectionUpdate = { ...collectionUpdate, bannerImage };
                    }

                    if (collectionData.name !== collection.name) {
                        collectionUpdate = {
                            ...collectionUpdate,
                            name: collectionData.name,
                            slug: slug(collectionData.name),
                        };
                        contractUpdate = {
                            ...contractUpdate,
                            name: collectionData.name,
                        };
                        contractChanged = true;
                    }

                    if (collectionData.description !== collection.description) {
                        collectionUpdate = {
                            ...collectionUpdate,
                            description: collectionData.description,
                        };
                        contractChanged = true;
                        contractUpdate = {
                            ...contractUpdate,
                            description: collectionData.description,
                        };
                    }

                    if (collectionData.category !== collection?.category) {
                        collectionUpdate = {
                            ...collectionUpdate,
                            category: collectionData.category,
                        };
                    }

                    if (
                        collectionData?.royalty?.creator !==
                        collection?.royalty?.creator
                    ) {
                        collectionUpdate = {
                            ...collectionUpdate,
                            royalty: {
                                ...collectionUpdate.royalty,
                                creator: creator,
                            },
                        };
                        royaltyChanged = true;
                    }

                    if (
                        collectionData?.royalty?.percentage !==
                        collection?.royalty?.percentage
                    ) {
                        if (percentage)
                            collectionUpdate = {
                                ...collectionUpdate,
                                royalty: {
                                    ...collectionUpdate.royalty,
                                    percentage: percentage,
                                },
                            };
                        royaltyChanged = true;
                    }

                    const contract = await sdk.getContract(collection._id);

                    if (contractChanged) {
                        await contract.metadata.update(contractUpdate);
                    }

                    if (royaltyChanged) {
                        await contract.royalties.setDefaultRoyaltyInfo({
                            seller_fee_basis_points: percentage
                                ? percentage * 100
                                : 0, // 1% royalty fee
                            fee_recipient:
                                creator ||
                                '0x0000000000000000000000000000000000000000', // the fee recipient
                        });
                    }

                    const { data, error } = await updateCollection({
                        variables: {
                            updateCollectionId: collection._id,
                            input: collectionUpdate,
                        },
                    });

                    notify('success');
                    router.push(`/collection/${data.updateCollection.slug}`);
                } catch (err) {
                    console.log(err);

                    notify('error');
                }
            }
            setSubmittingForm(false);
            document.body.style.overflowY = 'auto';
        }
    }

    return (
        <>
            <div className="w-[646px] max-w-full h-[100vh] mx-auto pt-10">
                <h1 className="py-6 text-white font-semibold text-[40px]">
                    Edit My Collection
                </h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="text-white mb-6">
                        <label
                            htmlFor="logoImage"
                            className="font-semibold mb-1"
                        >
                            Logo image *
                        </label>
                        <p>
                            This image will also be used for navigation. 350 x
                            350 recommended.
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-full h-40 w-40 flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('logoImage').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="logoImage"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.logoImage && (
                                <Image
                                    src={
                                        typeof collectionData.logoImage ===
                                        'string'
                                            ? collectionData.logoImage
                                            : URL.createObjectURL(
                                                  collectionData.logoImage
                                              )
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="logoImage"
                                />
                            )}
                            <MdImage className="text-[#cccccc] text-[84px] z-[5] opacity-0 group-hover:opacity-100" />
                            <div className="absolute inset-0 z-[15] h-full bg-[#00000099] opacity-0 group-hover:opacity-100 "></div>
                        </div>
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor="featuredImage"
                            className="font-semibold mb-1"
                        >
                            Featured image
                        </label>
                        <p>
                            This image will be used for featuring your
                            collection on the homepage, category pages, or other
                            promotional areas of OpenSea. 600 x 400 recommended.
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-[10px] h-[200px] w-[300px] flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('featuredImage').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="featuredImage"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.featuredImage && (
                                <Image
                                    src={
                                        typeof collectionData.featuredImage ===
                                        'string'
                                            ? collectionData.featuredImage
                                            : URL.createObjectURL(
                                                  collectionData.featuredImage
                                              )
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="featuredImage"
                                />
                            )}

                            <MdImage className="text-[#cccccc] text-[84px] z-[5] opacity-0 group-hover:opacity-100" />
                            <div className="absolute inset-0 z-[15] h-full bg-[#00000099] opacity-0 group-hover:opacity-100 "></div>
                        </div>
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor="bannerImage"
                            className="font-semibold mb-1"
                        >
                            Banner image
                        </label>
                        <p>
                            This image will appear at the top of your collection
                            page. Avoid including too much text in this
                            bannerImage image, as the dimensions change on
                            different devices. 1400 x 350 recommended.
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-[10px] h-[200px] max-w-[700px] flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('bannerImage').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="bannerImage"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.bannerImage && (
                                <Image
                                    src={
                                        typeof collectionData.bannerImage ===
                                        'string'
                                            ? collectionData.bannerImage
                                            : URL.createObjectURL(
                                                  collectionData.bannerImage
                                              )
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="bannerImage"
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
                            placeholder="Example: Treasures of the Sea"
                            inputCss="w-full"
                            onChange={e => {
                                handleCollectionDataChange(e);
                            }}
                            value={collectionData.name}
                        />
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor={'category'}
                            className={`block text-base font-semibold text-[#e5e8eb] pb-2 `}
                        >
                            Category
                        </label>
                        <Select
                            placeholder="Select a category"
                            name="category"
                            id="category"
                            options={options}
                            value={options.filter(
                                option =>
                                    option.value === collectionData.category
                            )}
                            onChange={e => {
                                setCollectionData({
                                    ...collectionData,
                                    category: e.value,
                                });
                            }}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: 'transparent',
                                    padding: '4px 0',
                                    border: state.menuIsOpen
                                        ? 'solid 2px #8a939b'
                                        : 'solid 2px #4c505c',
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
                            }}
                            className="react-select-container"
                            classNamePrefix="select"
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
                                setCollectionData({
                                    ...collectionData,
                                    description: e.target.value,
                                });
                            }}
                            value={collectionData.description}
                        />
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor="description"
                            className={`block text-base font-semibold text-[#e5e8eb] pb-2`}
                        >
                            Creator earning
                        </label>
                        <div className="flex">
                            <TextInput
                                placeholder="Enter an address"
                                inputCss="w-full"
                                onChange={e => {
                                    setCollectionData({
                                        ...collectionData,
                                        royalty: {
                                            ...collectionData.royalty,
                                            creator: e.target.value,
                                        },
                                    });
                                }}
                                value={
                                    collectionData?.royalty?.creator === null
                                        ? ''
                                        : collectionData?.royalty?.creator
                                }
                            />
                            <div className="flex w-[25%] ml-6 items-center">
                                <input
                                    className={`w-full rounded-xl border-2 border-[#4c505c] py-[10px] px-4 bg-transparent text-white hover:border-[#8a939b] focus:border-[#8a939b] without-ring transition-colors ease-in-out duration-[250] no-spin-buttons   `}
                                    placeholder="0"
                                    type="number"
                                    onChange={e => {
                                        setCollectionData({
                                            ...collectionData,
                                            royalty: {
                                                ...collectionData.royalty,
                                                percentage: e.target.value,
                                            },
                                        });
                                    }}
                                    value={
                                        collectionData?.royalty?.percentage ===
                                        null
                                            ? ''
                                            : collectionData?.royalty
                                                  ?.percentage
                                    }
                                />
                                <span className="text-lg relative right-6">
                                    %
                                </span>
                            </div>
                            <button
                                className="rounded-[50%] hover:bg-[#4c505c] p-3 ml-2 "
                                onClick={e => {
                                    e.preventDefault();
                                    setCollectionData({
                                        ...collectionData,
                                        royalty: {
                                            creator: '',
                                            percentage: '',
                                        },
                                    });
                                }}
                            >
                                <MdDeleteOutline className="text-white text-[24px]" />
                            </button>
                        </div>
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
                        {submittingForm ? <Spinner /> : 'Save'}
                    </button>
                    <ToastContainer />
                </form>
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

export default EditCollection;

export const getServerSideProps = requireAuthentication(async context => {
    const { req, res } = context;
    const address = req.cookies.__user_address;
    const { data } = await client.query({
        query: GET_COLLECTION_BY_QUERY,
        variables: {
            query: `slug=${context.params.slug.toLowerCase()}&owner=${address.toLowerCase()}`,
        },
        fetchPolicy: 'network-only',
    });
    if (data.getAllCollections.length <= 0)
        return {
            notFound: true,
        };
    return { props: { collection: data.getAllCollections[0], owner: address } };
});
