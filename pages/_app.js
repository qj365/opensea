import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import '../styles/globals.css';
import { SidebarContextProvider } from '../context/sidebar-context';

function MyApp({ Component, pageProps }) {
    const getLayout =
        Component.getLayout ||
        (page => <OnlyHeaderLayout>{page}</OnlyHeaderLayout>);
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
        cache: new InMemoryCache(),
    });

    return (
        <ThirdwebProvider desiredChainId={ChainId.Goerli}>
            <SidebarContextProvider>
                {getLayout(<Component {...pageProps} />)}
            </SidebarContextProvider>
        </ThirdwebProvider>
    );
}

export default MyApp;
