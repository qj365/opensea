import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { MdShare, MdLanguage, MdSettings } from 'react-icons/md';
import { Tooltip } from 'flowbite-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Logo from '../../assets/icons';
import shortenAddress from '../../utils/shortenAddress';
import Toast from '../common/Toast';
import ShowMore from '../common/ShowMore';
import { useAddress } from '@thirdweb-dev/react';
import { formatJoinedDate } from '../../utils/formatDate';
import { useRouter } from 'next/router';
import Link from 'next/link';

function ProfileImage({ collection, token }) {
    const router = useRouter();

    const [copiedAddress, setCopiedAddress] = useState(false);
    const handleCopyAddress = () => {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 1000);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleToast, setIsVisibleToast] = useState(false);
    const [typeToast, setTypeToast] = useState('success');

    const [messageToast, setMessageToast] = useState('Link copied!');
    const address = useAddress();

    const options = [
        {
            name: 'opensea',
            image: Logo.openSeaRealLogo.src,
            text: 'Copy link',
            func: function () {
                navigator.clipboard
                    .writeText(
                        window.location.pathname.toLowerCase() === '/account'
                            ? `${window.location.origin}/${token}`
                            : window.location.href
                    )
                    .then(
                        function () {
                            setIsVisibleToast(true);
                            setTypeToast('success');
                        },
                        function (err) {
                            setTypeToast('error');
                            setMessageToast('Copy failed!');
                        }
                    );
                setIsOpen(false);
            },
        },
        {
            name: 'facebook',
            image: Logo.facebookLogo.src,
            text: 'Share on Facebook',
            func: function () {
                window
                    .open(
                        `https://www.facebook.com/sharer/sharer.php?u=${
                            window.location.pathname.toLowerCase() ===
                            '/account'
                                ? `${window.location.origin}/${token}`
                                : window.location.href
                        }`,
                        '_blank'
                    )
                    .focus();
                setIsOpen(false);
            },
        },
        {
            name: 'twitter',
            image: Logo.twitterLogo.src,
            text: 'Share on Twitter',
            func: function () {
                window
                    .open(
                        `https://twitter.com/intent/tweet?text=Check out this NFT account ${
                            window.location.pathname.toLowerCase() ===
                            '/account'
                                ? `${window.location.origin}/${token}`
                                : window.location.href
                        }`,
                        '_blank'
                    )
                    .focus();
                setIsOpen(false);
            },
        },
    ];
    return (
        <>
            <div className="w-full h-[320px] bg-[#262b2f] relative">
                {collection.bannerImage && (
                    <Image
                        src={collection.bannerImage}
                        layout="fill"
                        objectFit="cover"
                        alt="cover"
                    />
                )}
            </div>
            <div className="w-full bg-[#202225] px-8 h-fit">
                <div className="top-[-148px] relative">
                    {/* 202225 */}
                    <div className="relative h-[168px] w-[168px] rounded-[10px] border-[6px] border-[#202225] overflow-hidden">
                        {collection.logoImage && (
                            <Image
                                src={collection.logoImage}
                                layout="fill"
                                objectFit="cover"
                                alt="avatar"
                            />
                        )}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <p className="font-semibold text-[30px] text-white">
                            {collection.name}
                        </p>
                        <div className="flex items-center">
                            {/* {collection.link && (
                                <>
                                    <a
                                        href={collection.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className=" mr-2"
                                    >
                                        <button className="rounded-[50%] hover:bg-[#4c505c] p-3 ">
                                            <MdLanguage className="text-xl text-white" />
                                        </button>
                                    </a>
                                    <div className="h-[50%] border-r-[1px] border-[#4c505c]"></div>
                                </>
                            )} */}
                            <button
                                className="rounded-[50%] hover:bg-[#4c505c] p-3 ml-2 "
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <MdShare className="text-xl text-white" />
                            </button>
                            {address?.toLowerCase() === collection.owner && (
                                <Link
                                    href={`/collection/${collection.slug}/edit`}
                                >
                                    <button className="rounded-[50%] hover:bg-[#4c505c] p-3">
                                        <MdSettings className="text-xl text-white" />
                                    </button>
                                </Link>
                            )}
                        </div>

                        {isOpen && (
                            <ul className="absolute top-60 right-0 w-60 bg-[#303339] rounded-lg shadow-xl overflow-hidden">
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center p-4 hover:bg-[#262b2f] w-full cursor-pointer"
                                        onClick={option.func}
                                    >
                                        <Image
                                            src={option.image}
                                            alt={option.text}
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-2 font-semibold text-sm text-white">
                                            {option.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* <div className="flex mt-1">
                        <Image
                            src={Logo.EthLogo.src}
                            alt="eth"
                            width={20}
                            height={20}
                        />
                        <CopyToClipboard
                            text={address}
                            onCopy={handleCopyAddress}
                        >
                            <button className="hover:text-red text-[#e5e8eb] ml-2">
                                <Tooltip
                                    content={copiedAddress ? 'Copied!' : 'Copy'}
                                >
                                    <span className="hover:text-[rgba(229,232,235,0.8)]">
                                        {shortenAddress(address)}
                                    </span>
                                </Tooltip>
                            </button>
                        </CopyToClipboard>
                        <span className="text-[#8a939b] ml-3">
                            {formatJoinedDate(collection.createdAt)}
                        </span>
                    </div> */}
                    {collection.description && (
                        <div>
                            <ShowMore>{collection.description}</ShowMore>
                        </div>
                    )}
                    <div className="mt-[30px] grid grid-cols-3 gap-2 w-1/4">
                        <div className="flex flex-col">
                            <span className="font-semibold text-white text-[20px]">
                                {collection.totalVolume
                                    ? collection.totalVolume + ' ETH'
                                    : '-- ETH'}
                            </span>
                            <span className="text-sm text-[#8a939b]">
                                total volume
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white text-[20px]">
                                {collection.floorPrice
                                    ? collection.floorPrice + ' ETH'
                                    : '-- ETH'}
                            </span>
                            <span className="text-sm text-[#8a939b]">
                                floor price
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white text-[20px]">
                                {collection.sales ? collection.sales : '--'}
                            </span>
                            <span className="text-sm text-[#8a939b]">
                                sales
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={messageToast}
                type={typeToast}
                isVisibleToast={isVisibleToast}
                setIsVisibleToast={setIsVisibleToast}
            />
        </>
    );
}

export default ProfileImage;
