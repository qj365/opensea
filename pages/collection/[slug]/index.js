import React from 'react';
import { useQuery } from '@apollo/client';
import {
    GET_COLLECTION_BY_QUERY,
    COLLECTION_INFO,
} from '../../../graphql/query';
import { useRouter } from 'next/router';
import CollectionImage from '../../../components/collection/CollectionImage';
import Error from 'next/error';
import CollectionList from '../../../components/collection/CollectionList';

function CollectionPage() {
    const router = useRouter();
    const { data, loading, error } = useQuery(COLLECTION_INFO, {
        variables: {
            slug: router.query?.slug?.toLowerCase(),
        },
        fetchPolicy: 'network-only',
    });

    if (error || (!loading && !data?.getCollectionInfoBySlug))
        return <Error statusCode={404} />;
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <CollectionImage collection={data.getCollectionInfoBySlug} />
            <CollectionList collection={data.getCollectionInfoBySlug} />
        </>
    );
}

export default CollectionPage;
