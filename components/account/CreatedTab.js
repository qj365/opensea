import { useState, useEffect } from 'react';
import Filter from '../common/Filter';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_NFTS, GET_COLLECTIONS_FOR_DISPLAY } from '../../graphql/query';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import CardVertical from '../common/CardVertical';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import SlideCardHorizontal from '../common/SlideCardHorizontal';

function CreatedTab(props) {
    const router = useRouter();
    const [getAllNfts, { data, loading }] = useLazyQuery(GET_ALL_NFTS);
    const { data: collections } = useQuery(GET_COLLECTIONS_FOR_DISPLAY, {
        variables: {
            query: `owner=${
                router.query.account[0] === 'account'
                    ? props.token?.toLowerCase()
                    : router.query.account[0]
            }`,
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
            let query = `creator=${
                router.query.account[0] === 'account'
                    ? props.token?.toLowerCase()
                    : router.query.account[0]
            }`;
            const queryObj = { ...router.query };
            delete queryObj.account;

            try {
                const { data } = await getAllNfts({
                    variables: {
                        query,
                    },
                });
                setNfts(data.getAllNfts);
                if (Object.keys(router.query).length > 1) {
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
        <div className=" mt-8">
            {collections && (
                <div className="">
                    <div className="w-full h-auto">
                        <Slide
                            slidesToScroll={2}
                            slidesToShow={3}
                            indicators={true}
                            scale={1.4}
                        >
                            {collections.getAllCollections.map(
                                (collection, index) => {
                                    return (
                                        <div key={index}>
                                            <SlideCardHorizontal
                                                logoImage={collection.logoImage}
                                                featuredImage={
                                                    collection?.featuredImage
                                                }
                                                name={collection.name}
                                                slug={collection.slug}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </Slide>
                    </div>
                </div>
            )}
            <div className="flex w-full">
                <Filter
                    searchObj={searchObj}
                    setSearchObj={setSearchObj}
                    router={router}
                    token={props.token}
                />
                <div className="w-3/4 ml-4">
                    {loading ? (
                        <div className="text-white">Loading items...</div>
                    ) : (
                        <>
                            <div className="text-white text-base font-semibold mb-8">
                                {nfts.length} item{nfts.length > 1 ? 's' : ''}
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
    );
}

export default CreatedTab;
