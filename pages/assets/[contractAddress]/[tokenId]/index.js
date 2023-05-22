import ItemWrapper from '../../../../components/sub-asset/ItemWrapper';
import ItemActivity from '../../../../components/sub-asset/ItemActivity';
import client from '../../../../graphql/apollo-client';
import {
    GET_SLUG_COLLECTION_BY_ID,
    GET_BEST_OFFER,
} from '../../../../graphql/query';
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
import useDidMountEffect from '../../../../utils/useDidMountEffect';

function NftItem() {
    const router = useRouter();
    const address = useAddress();

    const sdk = useSDK();
    const { contractAddress, tokenId } = router.query;

    const [viewsNft] = useMutation(VIEWS_NFT, {
        refetchQueries: {
            query: GET_NFT_ASSET_PAGE,
            variables: {
                collectionNft: contractAddress.toLowerCase(),
                tokenId: parseInt(tokenId),
            },
        },
    });

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
    }, []);

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

    const [usdPrice, setUsdPrice] = useState({ ETH: 0, WETH: 0 });
    useEffect(() => {
        async function getUsdPrice() {
            const eth = await (
                await fetch(
                    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
                )
            ).json();

            const weth = await (
                await fetch(
                    'https://min-api.cryptocompare.com/data/price?fsym=WETH&tsyms=USD'
                )
            ).json();
            setUsdPrice({ ETH: eth.USD, WETH: weth.USD });
        }
        getUsdPrice();
    }, []);

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
                <ItemWrapper
                    nft={nftData.getNftAssetPage}
                    usdPrice={usdPrice}
                />
                <ItemActivity nft={nftData.getNftAssetPage} address={address} />
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
