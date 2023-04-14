import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import '../styles/globals.css';
import { SidebarContextProvider } from '../context/sidebar-context';
import ClientOnly from '../components/layout/ClientOnly';
import { AvatarContextProvider } from '../context/avatar-context';
import client from '../graphql/apollo-client';
import '../styles/Calendar.css';
import '../styles/DateTimeRangePicker.css';
import { Localhost, Goerli } from '@thirdweb-dev/chains';
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
                    ...Goerli,
                    rpc: ['https://rpc.ankr.com/eth_goerli'],
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
