import { useEffect, useState, useContext } from 'react';
import {
    MdAccountCircle,
    MdKeyboardArrowDown,
    MdLogout,
    MdSync,
} from 'react-icons/md';
import {
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
    useAddress,
    useDisconnect,
    useSDK,
} from '@thirdweb-dev/react';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import Logo from '../../assets/icons';
import shortenAddress from '../../utils/shortenAddress';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Tooltip, Spinner } from 'flowbite-react';
import { SidebarContext } from '../../context/sidebar-context';

const wallets = [
    {
        id: 'metamask',
        name: 'Metamask',
        logo: Logo.MetamaskLogo.src,
    },
    {
        id: 'walletconnect',
        name: 'WalletConnect',
        logo: Logo.walletconnectLogo.src,
    },
    {
        id: 'coinbaseWallet',
        name: 'Coinbase Wallet',
        logo: Logo.coinbaseWalletLogo.src,
    },
];

function AccountSidebar() {
    const { sidebarIsVisible, toggleSidebar } = useContext(SidebarContext);

    const address = useAddress();
    const disconnect = useDisconnect();
    const router = useRouter();
    const sdk = useSDK();

    const connectWithWallet = {
        metamask: useMetamask(),
        walletconnect: useWalletConnect(),
        coinbaseWallet: useCoinbaseWallet(),
    };

    const [copiedAddress, setCopiedAddress] = useState(false);
    const [balance, setBalance] = useState(null);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const handleCopyAddress = () => {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 1000);
    };

    const [showMyWalletOption, setShowMyWalletOptions] = useState(false);

    function handleLogout() {
        router.push('/');
        window.localStorage.removeItem('__user_address');
        setShowMyWalletOptions(false);
        disconnect();
    }

    // useEffect(() => {
    //     if (window?.ethereum) {
    //         window.ethereum.on('accountsChanged', async function (accounts) {
    //             if (!accounts?.length) {
    //                 window.localStorage.removeItem('__user_address');
    //             } else {
    //                 console.log('change ' + address);
    //                 window.localStorage.setItem('__user_address', accounts[0]);
    //                 router.push(`/account/${accounts[0]}`);
    //             }
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (window) {
            if (!address) window.localStorage.removeItem('__user_address');
            else window.localStorage.setItem('__user_address', address);
        }
    }, [address]);

    const getBalance = async () => {
        setIsLoadingBalance(true);
        const balanceEth = await sdk.wallet.balance();
        const balanceWeth = await sdk.wallet.balance(
            process.env.NEXT_PUBLIC_WETH_ADDRESS
        );
        setBalance({ eth: balanceEth, weth: balanceWeth });
        setIsLoadingBalance(false);
    };
    useEffect(() => {
        if (sidebarIsVisible && address) {
            getBalance();
        }
        if (!sidebarIsVisible) {
            setShowMyWalletOptions(false);
        }
    }, [sidebarIsVisible, address]);

    return (
        <>
            <div
                onClick={toggleSidebar}
                className={`bg-[#00000099] fixed inset-0 z-10 transition-opacity ease-in-out duration-300 ${
                    sidebarIsVisible ? 'opacity-100' : 'opacity-0 -z-50'
                }`}
            ></div>
            <aside
                className={`fixed right-0 bottom-0 z-20 h-[calc(100%-72px)] w-[420px] bg-[#262b2f] border-[1px] border-[#353840] overflow-y-auto overflow-x-hidden transition ease-in-out duration-300 ${
                    sidebarIsVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-[100%]'
                }`}
            >
                {address ? (
                    <div>
                        <div className="p-[20px] font-semibold text-base text-white flex items-center justify-between border-b-[1px] border-[#353840] ">
                            <button
                                className="flex items-center"
                                onClick={() =>
                                    setShowMyWalletOptions(!showMyWalletOption)
                                }
                            >
                                <MdAccountCircle className="text-3xl mr-2" />
                                My wallet
                                <MdKeyboardArrowDown className="text-[#8a939b] text-2xl ml-2" />
                            </button>

                            {showMyWalletOption && (
                                <ul className="bg-[#303339] rounded-[10px] shadow-sm z-10 absolute top-[61px] left-[20px] text-sm overflow-hidden">
                                    <li
                                        className="p-4 flex items-center border-[1px] border-[#353840] pr-8 hover:cursor-pointer hover:bg-[#262b2f]"
                                        onClick={handleLogout}
                                    >
                                        <MdLogout className="text-2xl mr-4" />
                                        Log out
                                    </li>
                                    <li
                                        className="p-4 flex items-center border-[1px] border-[#353840] pr-8 hover:cursor-pointer hover:bg-[#262b2f]"
                                        onClick={getBalance}
                                    >
                                        <MdSync className="text-2xl mr-4" />
                                        Refresh funds
                                    </li>
                                </ul>
                            )}

                            <CopyToClipboard
                                text={address}
                                onCopy={handleCopyAddress}
                            >
                                <button>
                                    <Tooltip
                                        content={
                                            copiedAddress ? 'Copied!' : 'Copy'
                                        }
                                    >
                                        <span className="text-sm text-[#7b848b] hover:text-[#707a83]">
                                            {shortenAddress(address)}
                                        </span>
                                    </Tooltip>
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="p-[20px]">
                            <ul className="mt-6 border-[1px] border-[#353840] rounded-[10px] bg-[#202225]">
                                <li className="p-4 border-b-[1px] border-[#353840] flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Image
                                            src={Logo.EthLogo.src}
                                            height={24}
                                            width={24}
                                            alt="eth"
                                        />
                                        <div className="flex flex-col ml-4">
                                            <span className="text-sm text-white font-semibold">
                                                ETH
                                            </span>
                                            <span className="text-sm text-[#8a939b]">
                                                Goerli
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {isLoadingBalance ? (
                                            <Spinner />
                                        ) : (
                                            <Tooltip
                                                content={
                                                    balance?.eth.displayValue ||
                                                    '0'
                                                }
                                            >
                                                <span className="font-semibold text-white ">
                                                    {balance?.eth.displayValue.slice(
                                                        0,
                                                        6
                                                    ) || '0'}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                </li>
                                <li className="p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Image
                                            src={Logo.wethLogo.src}
                                            height={24}
                                            width={24}
                                            alt="weth"
                                        />
                                        <div className="flex flex-col ml-4">
                                            <span className="text-sm text-white font-semibold">
                                                WETH
                                            </span>
                                            <span className="text-sm text-[#8a939b]">
                                                Goerli
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {isLoadingBalance ? (
                                            <Spinner />
                                        ) : (
                                            <Tooltip
                                                content={
                                                    balance?.weth
                                                        .displayValue || '0'
                                                }
                                            >
                                                <span className="font-semibold text-white ">
                                                    {balance?.weth.displayValue.slice(
                                                        0,
                                                        6
                                                    ) || '0'}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="p-[20px] font-semibold text-base text-white flex items-center border-b-[1px] border-[#353840] ">
                            <MdAccountCircle className="text-3xl mr-2" />
                            My wallet
                        </div>
                        <div className="p-[20px]">
                            <p className="text-[#8a939b] text-base">
                                If you don&apos;t have a wallet yet, you can
                                select a provider and create one now.
                            </p>
                            <ul className="mt-6 border-[1px] border-[#353840] rounded-[10px] bg-[#202225]">
                                {wallets.map(wallet => (
                                    <li
                                        className="border-b-[1px] border-[#151b22] hover:bg-[#262b2f] last:border-b-0"
                                        key={wallet.id}
                                    >
                                        <button
                                            className="p-5 w-full flex justify-between"
                                            onClick={async () => {
                                                const { data, error } =
                                                    await connectWithWallet[
                                                        wallet.id
                                                    ]();
                                                if (error) {
                                                    console.log(
                                                        'connect wallet error: ',
                                                        error
                                                    );
                                                }
                                            }}
                                        >
                                            <div className="flex">
                                                <Image
                                                    src={wallet.logo}
                                                    width={24}
                                                    height={24}
                                                    alt={wallet.name}
                                                />
                                                <p className="text-white text-sm ml-4 font-semibold">
                                                    {wallet.name}
                                                </p>
                                            </div>
                                            {wallet.id === 'metamask' && (
                                                <div className="text-white text-sm bg-[#2081e2] rounded-[10px] px-2 py-1">
                                                    Popular
                                                </div>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}

export default AccountSidebar;
