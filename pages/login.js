import {
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
    useAddress,
    useDisconnect,
    useSDK,
    useLogin,
    useLogout,
    useUser,
} from '@thirdweb-dev/react';
import Image from 'next/image';
import {
    MdAccountCircle,
    MdKeyboardArrowDown,
    MdLogout,
    MdSync,
} from 'react-icons/md';
import { useEffect, useState, useContext } from 'react';
import Logo from '../assets/icons';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons/lib';
import useDidMountEffect from '../utils/useDidMountEffect';
import Cookies from 'js-cookie';
import { SidebarContext } from '../context/sidebar-context';

function LoginPage() {
    const { hideSidebar } = useContext(SidebarContext);
    useEffect(() => {
        hideSidebar();
    }, []);

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

    const connectWithWallet = {
        metamask: useMetamask(),
        walletconnect: useWalletConnect(),
        coinbaseWallet: useCoinbaseWallet(),
    };

    const router = useRouter();

    const address = useAddress();

    return (
        <div className="w-full h-[100vh]">
            <div className="pt-20 max-w-[610px] mx-auto">
                <p className="text-white text-2xl font-semibold my-4">
                    Connect your wallet.
                </p>
                <p className="text-[#8a939b] text-base">
                    If you don&apos;t have a wallet yet, you can select a
                    provider and create one now.
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
                                        await connectWithWallet[wallet.id]();
                                    if (error) {
                                        console.log(
                                            'connect wallet error: ',
                                            error
                                        );
                                    }
                                    if (data) {
                                        window.localStorage.setItem(
                                            '__user_address',
                                            data
                                        );
                                        Cookies.set('__user_address', data);
                                        if (router.query.referrer) {
                                            return router.push(
                                                router.query.referrer
                                            );
                                        }
                                        return router.push('/');
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
    );
}

export default LoginPage;

export function getServerSideProps(context) {
    const { req, res } = context;
    const token = req.cookies.__user_address;
    if (token) {
        return {
            redirect: {
                destination: context.query.referrer || '/',
            },
        };
    }

    return { props: { data: {} } };
}
