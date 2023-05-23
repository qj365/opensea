import {
    ChainId,
    ThirdwebProvider,
    useNetworkMismatch,
    useNetwork,
} from '@thirdweb-dev/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import '../styles/globals.css';
import { SidebarContextProvider } from '../context/sidebar-context';
import ClientOnly from '../components/layout/ClientOnly';
import { AvatarContextProvider } from '../context/avatar-context';
import client from '../graphql/apollo-client';
import '../styles/Calendar.css';
import '../styles/DateTimeRangePicker.css';
import { Localhost, Sepolia } from '@thirdweb-dev/chains';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useState } from 'react';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
    const [progress, setProgress] = useState(false);
    Router.events.on('routeChangeStart', () => {
        setProgress(true);
    });

    Router.events.on('routeChangeComplete', () => {
        setProgress(false);
    });

    const getLayout =
        Component.getLayout ||
        (page => <OnlyHeaderLayout>{page}</OnlyHeaderLayout>);

    return (
        <ApolloProvider client={client}>
            <ThirdwebProvider
                activeChain={{
                    ...Sepolia,
                    rpc: [
                        'https://ethereum-sepolia.blockpi.network/v1/rpc/26cb2aff2f8655e04b734b0d6aa45993f5771812',
                        'https://rpc.sepolia.org',
                        'https://eth-sepolia.public.blastapi.io',
                    ],
                }}
            >
                <ClientOnly>
                    <AvatarContextProvider>
                        <SidebarContextProvider>
                            {progress && <TopBarProgress />}
                            {getLayout(<Component {...pageProps} />)}
                        </SidebarContextProvider>
                    </AvatarContextProvider>
                </ClientOnly>
            </ThirdwebProvider>
        </ApolloProvider>
    );
}

export default MyApp;
