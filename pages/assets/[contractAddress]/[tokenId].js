import ItemWrapper from '../../../components/sub-asset/ItemWrapper';
import ItemActivity from '../../../components/sub-asset/ItemActivity';
import client from '../../../graphql/apollo-client';
import { GET_SLUG_COLLECTION_BY_ID } from '../../../graphql/query';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useAddress, useContract, useNFT } from '@thirdweb-dev/react';
import { Spinner } from 'flowbite-react';
import {
    GET_COLLECTION_BY_ID,
    GET_USER_NAME_BY_ID,
} from '../../../graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client';

function NftItem() {
    const router = useRouter();
    const address = useAddress();
    const { contractAddress, tokenId } = router.query;

    const { data: collection, error: errorCollection } = useQuery(
        GET_COLLECTION_BY_ID,
        {
            variables: { getCollectionByIdId: contractAddress },
        }
    );

    const { contract, error: errorContract } = useContract(contractAddress);
    const { data: nft, isLoading, error: errorNft } = useNFT(contract, tokenId);

    const [getUserNameById] = useLazyQuery(GET_USER_NAME_BY_ID);

    console.log('nft: ', nft);

    if (errorContract || errorNft || errorCollection)
        return <Error statusCode={404} title="NFT not found" />;

    if (isLoading)
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner size="xl" />
            </div>
        );

    return (
        <>
            <div className="pt-2 pb-4 w-[1280px] m-auto">
                <ItemWrapper
                    nft={nft}
                    collection={collection.getCollectionById}
                    contractAddress={contractAddress}
                    tokenId={tokenId}
                />
                <ItemActivity />
            </div>
        </>
    );
}

export default NftItem;
