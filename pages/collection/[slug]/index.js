import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_BY_QUERY } from '../../../graphql/query';
import { useRouter } from 'next/router';
import CollectionImage from '../../../components/collection/CollectionImage';
import Error from 'next/error';
import CollectionList from '../../../components/collection/CollectionList';

function CollectionPage() {
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_COLLECTION_BY_QUERY, {
        variables: {
            query: `slug=${router.query?.slug?.toLowerCase()}`,
        },
        fetchPolicy: 'network-only',
    });

    if (error || (!loading && data?.getAllCollections.length <= 0))
        return <Error statusCode={404} />;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CollectionImage collection={data.getAllCollections[0]} />
            <CollectionList collection={data.getAllCollections[0]} />
        </>
    );
}

export default CollectionPage;
