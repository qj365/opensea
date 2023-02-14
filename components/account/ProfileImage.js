import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { MdShare, MdLanguage } from 'react-icons/md';
import { Tooltip } from 'flowbite-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Logo from '../../assets/icons';
import shortenAddress from '../../utils/shortenAddress';
import Toast from '../common/Toast';
import ShowMore from '../common/ShowMore';

function ProfileImage() {
    const [copiedAddress, setCopiedAddress] = useState(false);
    const handleCopyAddress = () => {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 1000);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleToast, setIsVisibleToast] = useState(false);
    const [typeToast, setTypeToast] = useState('success');

    const [messageToast, setMessageToast] = useState('Link copied!');

    const options = [
        {
            name: 'opensea',
            image: Logo.openSeaRealLogo.src,
            text: 'Copy link',
            func: function () {
                navigator.clipboard.writeText(window.location.href).then(
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
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
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
                        `https://twitter.com/intent/tweet?text=Check out this NFT account ${window.location.href}`,
                        '_blank'
                    )
                    .focus();
                setIsOpen(false);
            },
        },
    ];
    return (
        <>
            <div className="w-full h-[320px] bg-[#262b2f]"></div>
            <div className="w-full bg-[#202225] px-8 h-fit">
                <div className="top-[-148px] relative">
                    {/* 202225 */}
                    <div className="relative h-[168px] w-[168px] rounded-[50%] border-[6px] border-[#202225] overflow-hidden">
                        <Image
                            src="https://i.seadn.io/gcs/files/e7e72c85caa933265d664cef001fb411.png?auto=format&w=256"
                            layout="fill"
                            objectFit="cover"
                            alt="avatar"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <p className="font-semibold text-[30px] text-white">
                            Not_0x
                        </p>
                        <div>
                            <button className="rounded-[50%] hover:bg-[#4c505c] p-3 mr-2">
                                <a
                                    href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/1"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <MdLanguage className="text-xl text-white" />
                                </a>
                            </button>
                            <button
                                className="rounded-[50%] hover:bg-[#4c505c] p-3"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <MdShare className="text-xl text-white" />
                            </button>
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
                    <div className="flex">
                        <Image
                            src={Logo.EthLogo.src}
                            alt="eth"
                            width={20}
                            height={20}
                        />
                        <CopyToClipboard
                            text="0xFd41545b555d1F5041aeBB5D49fd10f7DCEcaFfA"
                            onCopy={handleCopyAddress}
                        >
                            <button className="hover:text-red text-[#e5e8eb] ml-2">
                                <Tooltip
                                    content={copiedAddress ? 'Copied!' : 'Copy'}
                                >
                                    <span className="hover:text-[rgba(229,232,235,0.8)]">
                                        {shortenAddress(
                                            '0xFd41545b555d1F5041aeBB5D49fd10f7DCEcaFfA'
                                        )}
                                    </span>
                                </Tooltip>
                            </button>
                        </CopyToClipboard>
                        <span className="text-[#8a939b] ml-3">
                            Joined January 2023
                        </span>
                    </div>
                    <div>
                        <ShowMore>
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </ShowMore>
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
