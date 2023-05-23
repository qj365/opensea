import { useState, useEffect } from 'react';
import Filter from '../common/Filter';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_NFTS, NFT_QUERY } from '../../graphql/query';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import CardVertical from '../common/CardVertical';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardVerticalSkeleton from '../common/CardVerticalSkeleton';

function CollectedTab(props) {
    const router = useRouter();
    const [getQueryNfts1, { data: data1, loading: loading1 }] =
        useLazyQuery(NFT_QUERY);
    const [getQueryNfts2, { data: data2, loading: loading2 }] =
        useLazyQuery(NFT_QUERY);

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
                    owner:
                        router.query.account[0] === 'account'
                            ? props.token?.toLowerCase()
                            : router.query.account[0],
                    ...queryObj,
                }),
                page: page,
            },
            cache: new InMemoryCache(),
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
            cache: new InMemoryCache(),
        });
        if (data?.getQueryNfts?.nfts?.length > 0)
            setNfts([...nfts, ...data?.getQueryNfts?.nfts]);
        setPage(page => page + 1);
    }
    useEffect(() => {
        queryNFT1();
    }, [router.query]);
    return (
        <div className="flex w-full mt-8">
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
                                    data1?.getQueryNfts?.totalPage > page - 1
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
    );
}

export default CollectedTab;
