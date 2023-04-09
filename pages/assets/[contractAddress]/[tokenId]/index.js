import ItemWrapper from '../../../../components/sub-asset/ItemWrapper';
import ItemActivity from '../../../../components/sub-asset/ItemActivity';
import client from '../../../../graphql/apollo-client';
import { GET_SLUG_COLLECTION_BY_ID } from '../../../../graphql/query';
import Error from 'next/error';
import { useRouter } from 'next/router';
import {
    useAddress,
    useContract,
    useContractEvents,
    useSDK,
} from '@thirdweb-dev/react';
import { Spinner } from 'flowbite-react';
import {
    GET_COLLECTION_BY_ID,
    GET_USER_NAME_BY_ID,
} from '../../../../graphql/query';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    GET_NFT_ASSET_PAGE,
    GET_EVENT_OF_NFT,
} from '../../../../graphql/query';
import { VIEWS_NFT } from '../../../../graphql/mutation';
import { useEffect, useState } from 'react';
import Footer from '../../../../components/layout/Footer';

function NftItem() {
    const router = useRouter();
    const address = useAddress();

    const sdk = useSDK();
    const { contractAddress, tokenId } = router.query;

    const [viewsNft] = useMutation(VIEWS_NFT);

    useEffect(() => {
        async function updateViews() {
            if (contractAddress && tokenId) {
                console.log('update view+');
                await viewsNft({
                    variables: {
                        collectionNft: contractAddress.toLowerCase(),
                        tokenId: parseInt(tokenId),
                    },
                });
            }
        }
        updateViews();
    }, [contractAddress, tokenId]);

    const {
        data: nftData,
        loading,
        error,
    } = useQuery(GET_NFT_ASSET_PAGE, {
        variables: {
            collectionNft: contractAddress.toLowerCase(),
            tokenId: parseInt(tokenId),
        },
        fetchPolicy: 'network-only',
    });

    const { data: events } = useQuery(GET_EVENT_OF_NFT, {
        variables: {
            collectionNft: contractAddress.toLowerCase(),
            tokenId: parseInt(tokenId),
        },
        fetchPolicy: 'network-only',
    });

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        'marketplace-v3'
    );

    // useEffect(() => {
    //     async function getAvailableListing() {
    //         if (contract) {
    //             const validListings = await contract.directListings.getAllValid(
    //                 {
    //                     tokenContract: contractAddress, // Only show NFTs from this collection
    //                     tokenId: tokenId, // Only show NFTs with this ID
    //                 }
    //             );
    //             console.log(validListings);
    //             setValidListings(validListings);
    //         }
    //     }
    //     getAvailableListing();
    // }, [contract]);

    if (error) return <Error statusCode={404} title="NFT not found" />;

    if (loading)
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner size="xl" />
            </div>
        );

    return (
        <>
            <div className="pt-2 pb-4 w-[1280px] m-auto">
                <ItemWrapper nft={nftData.getNftAssetPage} />
                <ItemActivity />
            </div>
            <Footer />
        </>
    );
}

export default NftItem;

export function getServerSideProps({ params }) {
    return {
        props: {
            contractAddress: params.contractAddress,
            tokenId: params.tokenId,
        },
    };
}
