import { Accordion } from 'flowbite-react';
import { useState } from 'react';
import InputWithIcon from '../common/InputWithIcon';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS_FOR_DISPLAY } from '../../graphql/query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const eventTypes = [
    {
        name: 'Sale',
        value: 'sale',
    },
    {
        name: 'Listing',
        value: 'listing',
    },
    {
        name: 'Offer',
        value: 'offer',
    },
    {
        name: 'Mint',
        value: 'mint',
    },
    {
        name: 'Cancel',
        value: 'cancel',
    },
];
function EventFilter() {
    const [searchCollection, setSearchCollection] = useState('');
    const router = useRouter();
    // const [searchObj, setSearchObj] = useState({
    //     collection: '',
    //     sale: false,
    //     listing: false,
    //     offer: false,
    //     mint: false,
    //     cancel: false,
    // });
    const { data: collections, loading } = useQuery(
        GET_COLLECTIONS_FOR_DISPLAY
    );
    const query = { ...router.query };
    const [searchObj, setSearchObj] = useState();
    useEffect(() => {
        setSearchObj({
            collection: query.collection || '',
            sale: query.sale || false,
            listing: query.listing || false,
            offer: query.offer || false,
            mint: query.mint || false,
            cancel: query.cancel || false,
        });
    }, [router.isReady]);
    async function handleSearch(e) {
        e.preventDefault();
        const queryObj = { ...searchObj };
        for (const key in queryObj) {
            if (key !== 'account') {
                delete query[key];
            }
            if (!queryObj[key]) {
                delete queryObj[key];
            }
        }
        router.push({
            pathname: router.pathname,
            query: {
                ...query,
                ...queryObj,
            },
        });
    }

    return (
        <form
            onSubmit={handleSearch}
            className="h-[calc(100vh-72px)] w-1/4 overflow-y-auto sticky top-[72px]"
        >
            <Accordion alwaysOpen={true} className="border-0 pr-4 divide-y-0">
                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Event Type
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <ul>
                            {eventTypes.map((event, index) => (
                                <li
                                    className="h-12 px-[10px] flex items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md"
                                    key={index}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            searchObj?.[event.value] || false
                                        }
                                        onChange={e => {
                                            setSearchObj({
                                                ...searchObj,
                                                [event.value]: e.target.checked,
                                            });
                                        }}
                                        className="checkbox h-[24px] w-[24px] rounded-[6px] without-ring"
                                    />
                                    <p className="text-white ml-4">
                                        {event.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Collections
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <InputWithIcon
                            inputCss="w-full"
                            placeholder={'Search by collection'}
                            value={searchCollection || ''}
                            onChange={e => {
                                setSearchCollection(e.target.value);
                            }}
                        />
                        {
                            <div>
                                <div className="font-semibold text-xs text-[#8a939b] my-4">
                                    COLLECTION
                                </div>
                                {collections?.getAllCollections
                                    .filter(
                                        collection =>
                                            searchCollection.trim() === '' ||
                                            collection.name
                                                .toLowerCase()
                                                .includes(
                                                    searchCollection.toLowerCase()
                                                )
                                    )
                                    .map((collection, index) => (
                                        <button
                                            className={`flex w-full px-[10px] items-center py-3 rounded-lg hover:bg-[#353840] my-1 ${
                                                decodeURI(searchObj.collection)
                                                    ?.toLowerCase()
                                                    ?.split(',')
                                                    .includes(
                                                        collection.name.toLowerCase()
                                                    ) && 'bg-[#353840]'
                                            }`}
                                            key={index}
                                            onClick={e => {
                                                e.preventDefault();
                                                const decodedCollection =
                                                    decodeURI(
                                                        searchObj.collection ||
                                                            ''
                                                    );
                                                const filterColelction =
                                                    decodedCollection
                                                        ?.toLowerCase()
                                                        ?.split(',')
                                                        ?.includes(
                                                            collection.name.toLowerCase()
                                                        )
                                                        ? decodedCollection
                                                              ?.toLowerCase()
                                                              ?.split(',')
                                                              ?.filter(
                                                                  c =>
                                                                      c !==
                                                                      collection.name.toLowerCase()
                                                              )
                                                              ?.join(',')
                                                        : decodedCollection
                                                        ? decodedCollection.toLowerCase() +
                                                          ',' +
                                                          collection.name.toLowerCase()
                                                        : collection.name.toLowerCase();
                                                setSearchObj({
                                                    ...searchObj,
                                                    collection:
                                                        encodeURI(
                                                            filterColelction
                                                        ),
                                                });
                                            }}
                                        >
                                            <div className="h-7 w-7 relative rounded-[10px] overflow-hidden ">
                                                <Image
                                                    src={collection.logoImage}
                                                    alt="collection"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className="text-white text-sm ml-4">
                                                {collection.name}
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        }
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            <div className="flex my-4 pr-[10px]">
                <button
                    type="submit"
                    className="w-full bg-[#2081e2] text-white font-semibold text-lg h-12 rounded-xl hover:bg-[#4c505c] transition"
                >
                    Apply
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        router.push('/account/activity');
                    }}
                    className="w-full ml-4 bg-[#2081e2] text-white font-semibold text-lg h-12 rounded-xl hover:bg-[#4c505c] transition"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}

export default EventFilter;
