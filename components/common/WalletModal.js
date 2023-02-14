import {
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
    useAddress,
} from '@thirdweb-dev/react';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Modal, Spinner } from 'flowbite-react';
import Logo from '../../assets/icons';

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

function WalletModal({ showWalletModal, onClose }) {
    const connectWithWallet = {
        metamask: useMetamask(),
        walletconnect: useWalletConnect(),
        coinbaseWallet: useCoinbaseWallet(),
    };

    const router = useRouter();
    const address = useAddress();

    useEffect(() => {
        if (window?.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (!accounts?.length) {
                    window.localStorage.removeItem('__user_address');
                } else {
                    onClose();
                    window.localStorage.setItem('__user_address', accounts[0]);
                }
            });
        }
    }, []);

    return (
        <Modal show={showWalletModal} onClose={onClose}>
            <Modal.Header className="bg-[#202225] border-b-[1px] border-[#151b22]">
                <p className="text-white font-semibold">Connect your wallet</p>
            </Modal.Header>
            <div className="bg-[#202225] rounded-b">
                <ul>
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
                                }}
                            >
                                <div className="flex">
                                    <Image
                                        src={wallet.logo}
                                        width={32}
                                        height={32}
                                        alt={wallet.name}
                                    />
                                    <p className="text-white ml-4 font-semibold">
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
        </Modal>
    );
}

export default WalletModal;
