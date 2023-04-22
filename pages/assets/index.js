import Assets from '../../components/assets/Assets';
import CardVertical from '../../components/common/CardVertical';
import OnlyHeaderLayout from '../../components/layout/OnlyHeaderLayout';
import { MdRefresh } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_NFTS, GET_COLLECTIONS_FOR_DISPLAY } from '../../graphql/query';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import FilterAsset from '../../components/assets/FilterAsset';

export default function Assests() {
    const router = useRouter();
    const [getAllNfts, { data, loading }] = useLazyQuery(GET_ALL_NFTS);
    const { data: collections } = useQuery(GET_COLLECTIONS_FOR_DISPLAY, {
        variables: {
            query: ``,
        },
    });
    const [nfts, setNfts] = useState([]);
    const address = useAddress();
    const [searchObj, setSearchObj] = useState({
        name: '',
        collection: '',
        currency: 'ETH',
        minPrice: '',
        maxPrice: '',
        fixed: false,
        auction: false,
    });
    async function queryNFT() {
        if (router) {
            let query = ``;
            const queryObj = { ...router.query };

            try {
                await getAllNfts({
                    variables: {
                        query,
                    },
                });
                console.log(data);
                setNfts(data.getAllNfts);
                if (Object.keys(router.query).length > 0) {
                    const nfts = data.getAllNfts.filter(nft => {
                        if (queryObj.name) {
                            return nft.name
                                .toLowerCase()
                                .includes(queryObj.name.toLowerCase());
                        }
                        if (queryObj.collection) {
                            return decodeURI(queryObj.collection.toLowerCase())
                                .split(',')
                                .includes(nft.collectionNft.name.toLowerCase());
                        }
                        if (queryObj.auction && queryObj.fixed) {
                            return (
                                nft.listing.type === 'auction' ||
                                nft.listing.type === 'fixed'
                            );
                        } else if (queryObj.fixed) {
                            return nft?.listing?.type === 'fixed';
                        } else if (queryObj.auction) {
                            return nft?.listing?.type === 'auction';
                        }

                        if (
                            queryObj.currency &&
                            queryObj.minPrice &&
                            nft.listing
                        ) {
                            return (
                                nft.listing.currency === queryObj.currency &&
                                nft.listing.price >=
                                    parseFloat(queryObj.minPrice)
                            );
                        }

                        if (
                            queryObj.currency &&
                            queryObj.maxPrice &&
                            nft.listing
                        ) {
                            return (
                                nft.listing.currency === queryObj.currency &&
                                nft.listing.price <=
                                    parseFloat(queryObj.maxPrice)
                            );
                        }

                        if (queryObj.price) {
                            return nft.price
                                .toLowerCase()
                                .includes(queryObj.price.toLowerCase());
                        }
                    });
                    setNfts(nfts);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        queryNFT();
    }, [router.query]);
    return (
        <>
            {/* <div className="">
                {<Filter /> }
                { <Assets /> }
                <div className="flex flex-col w-3/4">
                    <div className="flex items-center mb-[10px]">
                        <button className="h-12 p-3 mr-2 outline-none hover:bg-[#4c505c66] hover:rounded-[50%]">
                            <MdRefresh className="text-white text-2xl" />
                        </button>
                        <p className="text-white text-base">46.608.776 items</p>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                        <CardVertical />
                    </div>
                </div>
            </div> */}

            <div className="flex px-[22px] pt-2">
                <div className="flex w-full">
                    <FilterAsset
                        searchObj={searchObj}
                        setSearchObj={setSearchObj}
                        router={router}
                    />
                    <div className="w-3/4 ml-4">
                        {loading ? (
                            <div className="text-white">Loading items...</div>
                        ) : (
                            <>
                                <div className="text-white text-base font-semibold mb-8">
                                    {nfts.length} item
                                    {nfts.length > 1 ? 's' : ''}
                                </div>

                                {nfts.length > 0 ? (
                                    <div className="w-full grid grid-cols-4 gap-4">
                                        {nfts.map((nft, index) => (
                                            <div key={index}>
                                                <CardVertical nft={nft} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center w-full h-[248px] border-[1px] border-[#353840] rounded-xl">
                                        <p className="text-white text-3xl">
                                            No items found for this search
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
