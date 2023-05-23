import { useState, useEffect } from 'react';
import Filter from '../common/Filter';
import { useLazyQuery, useQuery } from '@apollo/client';
import { NFT_QUERY, GET_COLLECTIONS_FOR_DISPLAY } from '../../graphql/query';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import CardVertical from '../common/CardVertical';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import SlideCardHorizontal from '../common/SlideCardHorizontal';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardVerticalSkeleton from '../common/CardVerticalSkeleton';

function CreatedTab(props) {
    const router = useRouter();
    const [getQueryNfts1, { data: data1, loading: loading1 }] =
        useLazyQuery(NFT_QUERY);
    const [getQueryNfts2, { data: data2, loading: loading2 }] =
        useLazyQuery(NFT_QUERY);

    const { data: collections, loading: collectionLoading } = useQuery(
        GET_COLLECTIONS_FOR_DISPLAY,
        {
            variables: {
                query: `owner=${
                    router.query.account[0] === 'account'
                        ? props.token?.toLowerCase()
                        : router.query.account[0]
                }`,
            },
        }
    );

    const [nfts, setNfts] = useState([]);
    const [searchObj, setSearchObj] = useState({
        name: '',
        collection: '',
        currency: 'ETH',
        minPrice: '',
        maxPrice: '',
        fixed: false,
        auction: false,
        sort: '-createdAt',
    });
    const [page, setPage] = useState(1);

    async function queryNFT1() {
        const queryObj = { ...router.query };
        delete queryObj.account;
        setSearchObj({ ...queryObj });
        const { data } = await getQueryNfts1({
            variables: {
                query: JSON.stringify({
                    creator:
                        router.query.account[0] === 'account'
                            ? props.token?.toLowerCase()
                            : router.query.account[0],
                    ...queryObj,
                }),
                page: page,
            },
            fetchPolicy: 'network-only',
        });
        if (data?.getQueryNfts?.nfts?.length > 0)
            setNfts([...nfts, ...data?.getQueryNfts?.nfts]);
        setPage(page => page + 1);
    }
    async function queryNFT2() {
        const queryObj = { ...router.query };
        delete queryObj.account;
        const { data } = await getQueryNfts2({
            variables: {
                query: JSON.stringify({
                    owner:
                        router.query.account[0] === 'account'
                            ? props.token?.toLowerCase()
                            : router.query.account[0],
                    ...queryObj,
                }),
                page: page,
                limit: 4,
            },
            fetchPolicy: 'network-only',
        });
        if (data?.getQueryNfts?.nfts?.length > 0)
            setNfts([...nfts, ...data?.getQueryNfts?.nfts]);
        setPage(page => page + 1);
    }
    useEffect(() => {
        queryNFT1();
    }, [router.query]);
    return (
        <div className=" mt-8">
            {!collectionLoading && collections.getAllCollections.length > 0 && (
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
                    setPage={setPage}
                    setNfts={setNfts}
                />
                <div className="w-3/4 ml-4">
                    {loading1 ? (
                        <div className="text-white">Loading items...</div>
                    ) : (
                        <div>
                            <div className="text-white text-base font-semibold mb-8">
                                {data1?.getQueryNfts?.total} item
                                {data1?.getQueryNfts?.total > 1 ? 's' : ''}
                            </div>

                            {nfts.length > 0 ? (
                                <InfiniteScroll
                                    className="w-full"
                                    dataLength={nfts.length}
                                    next={() => {
                                        queryNFT2();
                                    }}
                                    hasMore={
                                        data1?.getQueryNfts?.totalPage >
                                        page - 1
                                    }
                                    loader={
                                        <div className="w-full grid grid-cols-4 gap-4 mt-4">
                                            <CardVerticalSkeleton />
                                            <CardVerticalSkeleton />
                                            <CardVerticalSkeleton />
                                            <CardVerticalSkeleton />
                                        </div>
                                    }
                                >
                                    <div className="w-full grid grid-cols-4 gap-4">
                                        {nfts.map((nft, index) => (
                                            <div key={index}>
                                                <CardVertical nft={nft} />
                                            </div>
                                        ))}
                                    </div>
                                </InfiniteScroll>
                            ) : (
                                <div className="flex flex-col justify-center items-center w-full h-[248px] border-[1px] border-[#353840] rounded-xl">
                                    <p className="text-white text-3xl">
                                        No items found for this search
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default CreatedTab;
