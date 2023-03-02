import { useContext, useState } from 'react';
import TextInput from '../common/TextInput';
import client from '../../graphql/apollo-client';
import Image from 'next/image';
import { MdEdit } from 'react-icons/md';
import uploadImage from '../../utils/firebase';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import {
    UPDATE_AVATAR,
    UPDATE_BANNER,
    UPDATE_USER,
} from '../../graphql/mutation';
import { AvatarContext } from '../../context/avatar-context';
import { Spinner } from 'flowbite-react';
import { useAddress } from '@thirdweb-dev/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_USER_INFO } from '../../graphql/query';

function ProfileSetting({ userInfo }) {
    const [updateAvatar] = useMutation(UPDATE_AVATAR);
    const [updateBanner] = useMutation(UPDATE_BANNER);
    const [updateUser] = useMutation(UPDATE_USER);

    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [loadingBanner, setLoadingBanner] = useState(false);

    const { avatar, setAvatar } = useContext(AvatarContext);
    const [banner, setBanner] = useState(userInfo.profileBanner);

    const address = useAddress();

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
        if (status === 'success')
            toast.success('Profile successfully updated!', settingToast);
        else toast.error('Something went wrong!', settingToast);
    };

    const [userData, setUserData] = useState({
        username: userInfo.username,
        bio: userInfo.bio,
        email: userInfo.email,
        link: userInfo.link,
    });

    async function handleUpdateUser(event) {
        event.preventDefault();
        if (address && address !== Cookies.get('__user_address')) {
            window.location.href = '/login';
        } else
            try {
                const { error } = await updateUser({
                    variables: {
                        updateUserId: userInfo._id,
                        input: {
                            username: userData.username,
                            bio: userData.bio,
                            link: userData.link,
                        },
                    },
                });
                if (error) {
                    notify('error');
                } else {
                    notify('success');
                }
            } catch (err) {
                notify('error');
            }
    }

    return (
        <section className="mt-16 mx-14 max-w-[800px]">
            <h1 className="text-white text-[40px] font-semibold">
                Profile details
            </h1>

            <div className="mt-[30px]">
                <form onSubmit={handleUpdateUser}>
                    <div className="flex flex-row">
                        <div>
                            <div className="mb-6">
                                <TextInput
                                    label="Username"
                                    id="username"
                                    placeholder="Enter username"
                                    inputCss="w-[430px]"
                                    value={userData.username}
                                    onChange={e =>
                                        setUserData({
                                            ...userData,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <div>
                                    <label
                                        htmlFor="bio"
                                        className={`block text-base font-semibold text-[#e5e8eb] pb-2`}
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        type="text"
                                        id="bio"
                                        className={`w-[430px] rounded-xl border-2 border-[#4c505c] py-[10px] px-4 bg-transparent text-white hover:border-[#8a939b] focus:border-[#8a939b] without-ring transition-colors ease-in-out duration-[250]`}
                                        placeholder="Tell the world your story"
                                        value={userData.bio}
                                        onChange={e =>
                                            setUserData({
                                                ...userData,
                                                bio: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <TextInput
                                    label="Email Address"
                                    id="email"
                                    placeholder="Enter email"
                                    inputCss="w-[430px]"
                                    value={userData.email}
                                    onChange={e =>
                                        setUserData({
                                            ...userData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <TextInput
                                    label="Link"
                                    id="link"
                                    placeholder="Enter your site"
                                    inputCss="w-[430px]"
                                    value={userData.link}
                                    onChange={e =>
                                        setUserData({
                                            ...userData,
                                            link: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <TextInput
                                    label="Wallet Address"
                                    id="address"
                                    disabled={true}
                                    value={userInfo._id}
                                    inputCss="cursor-text text-[15px] opacity-80 w-[430px] "
                                />
                            </div>
                        </div>
                        <div className="ml-[80px]">
                            <div className="mb-6">
                                <label className="block text-base font-semibold text-[#e5e8eb] pb-2">
                                    Profile Image
                                </label>
                                <div
                                    className="relative group cursor-pointer rounded-full h-[150px] w-[150px] overflow-hidden"
                                    onClick={() => {
                                        if (loadingAvatar) return;
                                        document
                                            .getElementById('avartar')
                                            .click();
                                    }}
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        id="avartar"
                                        onChange={async event => {
                                            if (
                                                address &&
                                                Cookies.get(
                                                    '__user_address'
                                                ) === address
                                            ) {
                                                try {
                                                    setLoadingAvatar(true);
                                                    const url =
                                                        await uploadImage(
                                                            event.target
                                                                .files[0],
                                                            'avatars'
                                                        );
                                                    if (url) {
                                                        updateAvatar({
                                                            variables: {
                                                                updateUserId:
                                                                    userInfo._id.toLowerCase(),
                                                                input: {
                                                                    profileImage:
                                                                        url,
                                                                },
                                                            },
                                                        });
                                                        setAvatar(url);
                                                        setLoadingAvatar(false);
                                                        notify('success');
                                                    }
                                                } catch (err) {
                                                    setLoadingAvatar(false);
                                                    notify('error');
                                                }
                                            } else {
                                                window.location.href = '/login';
                                            }
                                        }}
                                    />

                                    {loadingAvatar ? (
                                        <div className="bg-[#14141499] rounded-full w-[150px] h-[150px] flex items-center justify-center">
                                            <Spinner size="lg" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-[#00000099] rounded-full w-[150px] h-[150px] flex items-center justify-center absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MdEdit className="text-white text-2xl" />
                                            </div>
                                            <Image
                                                layout="fill"
                                                src={
                                                    avatar ||
                                                    userInfo.profileImage
                                                }
                                                objectFit="cover"
                                                alt="avatar"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-[#e5e8eb] pb-2">
                                    Profile Banner
                                </label>
                                <div>
                                    <div
                                        className="relative group cursor-pointer rounded-[12px] h-[120px] w-[150px] overflow-hidden"
                                        onClick={() => {
                                            if (loadingBanner) return;
                                            document
                                                .getElementById('cover')
                                                .click();
                                        }}
                                    >
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            id="cover"
                                            onChange={async event => {
                                                if (
                                                    address &&
                                                    Cookies.get(
                                                        '__user_address'
                                                    ) === address
                                                ) {
                                                    try {
                                                        setLoadingBanner(true);
                                                        const url =
                                                            await uploadImage(
                                                                event.target
                                                                    .files[0],
                                                                'banners'
                                                            );
                                                        if (url) {
                                                            updateBanner({
                                                                variables: {
                                                                    updateUserId:
                                                                        userInfo._id.toLowerCase(),
                                                                    input: {
                                                                        profileBanner:
                                                                            url,
                                                                    },
                                                                },
                                                            });
                                                            setBanner(url);
                                                            setLoadingBanner(
                                                                false
                                                            );
                                                            notify('success');
                                                        }
                                                    } catch (err) {
                                                        setLoadingBanner(false);
                                                        notify('error');
                                                    }
                                                } else {
                                                    window.location.href =
                                                        '/login';
                                                }
                                            }}
                                        />

                                        {loadingBanner ? (
                                            <div className="bg-[#14141499] rounded-[12px] w-[150px] h-[120px] flex items-center justify-center">
                                                <Spinner size="lg" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bg-[#00000099] rounded-[12px] w-[150px] h-[120px] flex items-center justify-center absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MdEdit className="text-white text-2xl" />
                                                </div>
                                                {banner ? (
                                                    <Image
                                                        layout="fill"
                                                        src={banner}
                                                        objectFit="cover"
                                                        alt="cover"
                                                    />
                                                ) : (
                                                    <div className="bg-[#171616] w-[150px] h-[120px]"></div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="my-[30px] text-white text-base font-semibold py-[17px] px-[24px] bg-[#2081e2] rounded-xl hover:bg-[#2e8eee]"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
            <ToastContainer />
        </section>
    );
}

export default ProfileSetting;
