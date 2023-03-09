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
import Select from 'react-select';
import Image from 'next/image';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_COLLECTION_BY_NAME } from '../../graphql/query';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';
import uploadImage from '../../utils/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_COLLECTION } from '../../graphql/mutation';
import { useRouter } from 'next/router';
import slug from 'slug';
import ClipLoader from 'react-spinners/ClipLoader';

const options = [
    { value: 'Art', label: 'Art' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'PFP', label: 'PFP' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Sport', label: 'Sport' },
    { value: 'Music', label: 'Music' },
];

function CreateColelctionPage() {
    const [getCollectionsByQuery] = useLazyQuery(GET_COLLECTION_BY_NAME);
    const [createCollection] = useMutation(CREATE_COLLECTION);

    const sdk = useSDK();

    const address = useAddress();

    const router = useRouter();

    const [collectionData, setCollectionData] = useState({
        logo: null,
        featured: null,
        banner: null,
        name: '',
        category: '',
        description: '',
        owner: '',
    });

    useEffect(() => {
        if (address) {
            setCollectionData({
                ...collectionData,
                owner: address.toLowerCase(),
            });
        }
    }, [address]);

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

        if (!collectionData.logo) {
            formIsValid = false;
            errors['logo'] = 'Logo cannot be empty';
        }

        if (!collectionData.name) {
            formIsValid = false;
            errors['name'] = "Collection's name cannot be empty";
        } else {
            const { data, error } = await getCollectionsByQuery({
                variables: { query: `slug=${slug(collectionData.name)}` },
            });
            if (data.getAllCollections.length > 0) {
                formIsValid = false;
                errors['name'] = "Collection's name already exists";
            }
        }

        setErrors(errors);

        return formIsValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (address && address !== Cookies.get('__user_address')) {
            window.location.href = '/login';
        } else {
            const isValidate = await handleValidation();

            if (isValidate) {
                try {
                    document.body.style.overflowY = 'hidden';
                    setSubmittingForm(true);
                    const featured = await uploadImage(
                        collectionData.featured,
                        'collections'
                    );
                    const banner = await uploadImage(
                        collectionData.banner,
                        'collections'
                    );
                    const logo = await uploadImage(
                        collectionData.logo,
                        'collections'
                    );

                    const collectionAddress =
                        await sdk.deployer.deployNFTCollection({
                            name: collectionData.name,
                            description: collectionData.description,
                            image: logo,
                            primary_sale_recipient: address,
                        });

                    const collection = {
                        _id: collectionAddress.toLowerCase(),
                        name: collectionData.name,
                        category: collectionData.category,
                        description: collectionData.description,
                        logoImage: logo,
                        featuredImage: featured,
                        bannerImage: banner,
                        owner: collectionData.owner,
                    };
                    console.log(collection);
                    const { data } = await createCollection({
                        variables: { input: collection },
                    });

                    notify('success');
                    router.push(`/collection/${data.createCollection.slug}`);
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
                    Create a Collection
                </h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="text-white mb-6">
                        <label htmlFor="logo" className="font-semibold mb-1">
                            Logo image *
                        </label>
                        <p>
                            This image will also be used for navigation. 350 x
                            350 recommended.
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-full h-40 w-40 flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('logo').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="logo"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.logo && (
                                <Image
                                    src={URL.createObjectURL(
                                        collectionData.logo
                                    )}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="logo"
                                />
                            )}
                            <MdImage className="text-[#cccccc] text-[84px] z-[5] opacity-0 group-hover:opacity-100" />
                            <div className="absolute inset-0 z-[15] h-full bg-[#00000099] opacity-0 group-hover:opacity-100 "></div>
                        </div>
                    </div>
                    <div className="text-white mb-6">
                        <label
                            htmlFor="featured"
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
                                document.getElementById('featured').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="featured"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.featured && (
                                <Image
                                    src={URL.createObjectURL(
                                        collectionData.featured
                                    )}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="featured"
                                />
                            )}

                            <MdImage className="text-[#cccccc] text-[84px] z-[5] opacity-0 group-hover:opacity-100" />
                            <div className="absolute inset-0 z-[15] h-full bg-[#00000099] opacity-0 group-hover:opacity-100 "></div>
                        </div>
                    </div>
                    <div className="text-white mb-6">
                        <label htmlFor="banner" className="font-semibold mb-1">
                            Banner image
                        </label>
                        <p>
                            This image will appear at the top of your collection
                            page. Avoid including too much text in this banner
                            image, as the dimensions change on different
                            devices. 1400 x 350 recommended.
                        </p>
                        <div
                            className="group mt-2 cursor-pointer border-[3px] border-dashed border-[#cccccc] rounded-[10px] h-[200px] max-w-[700px] flex items-center justify-center relative overflow-hidden"
                            onClick={() =>
                                document.getElementById('banner').click()
                            }
                        >
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="banner"
                                onChange={e => {
                                    handleCollectionDataChange(e);
                                }}
                            />
                            {collectionData.banner && (
                                <Image
                                    src={URL.createObjectURL(
                                        collectionData.banner
                                    )}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="banner"
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
                    >
                        Create
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

export default CreateColelctionPage;

export const getServerSideProps = requireAuthentication(async context => {
    return {
        props: {},
    };
});
