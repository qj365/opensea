import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri:
        process.env.NEXT_PUBLIC_ENV === 'production'
            ? process.env.NEXT_PUBLIC_GRAPHQL_URI
            : process.env.NEXT_PUBLIC_GRAPHQL_URI_DEV,
    cache: new InMemoryCache(),
});

export default client;
