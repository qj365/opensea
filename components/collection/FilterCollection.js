import { Accordion } from 'flowbite-react';
import Textinput from '../common/TextInput';
import InputWithIcon from '../common/InputWithIcon';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS_FOR_DISPLAY } from '../../graphql/query';
import Image from 'next/image';
import { useState } from 'react';

function FilterCollection({
    searchObj,
    setSearchObj,
    router,
    token,
    setPage,
    setNfts,
}) {
    const [searchCollection, setSearchCollection] = useState('');
    function handleSearch(e) {
        e.preventDefault();

        if (
            !searchObj.minPrice &&
            !searchObj.maxPrice &&
            searchObj.minPrice !== 0 &&
            searchObj.maxPrice !== 0
        ) {
            delete searchObj.minPrice;
            delete searchObj.maxPrice;
            delete searchObj.currency;
        }

        const query = { ...router.query };
        for (const key in searchObj) {
            if (!searchObj[key]) {
                delete searchObj[key];
                delete query[key];
            }
        }
        router.push({
            pathname: router.pathname,
            query: {
                ...query,
                ...searchObj,
            },
        });
        setNfts([]);
        setPage(1);
    }

    return (
        <form
            onSubmit={handleSearch}
            className="h-[calc(100vh-72px)] w-1/4 overflow-y-auto sticky top-[72px]"
        >
            <Accordion alwaysOpen={true} className="border-0 pr-4 divide-y-0">
                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        NFT
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <InputWithIcon
                            inputCss="w-full"
                            placeholder={'Search by name'}
                            value={searchObj.name || ''}
                            onChange={e => {
                                setSearchObj({
                                    ...searchObj,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </Accordion.Content>
                </Accordion.Panel>
                {/* <Accordion.Panel>
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
                </Accordion.Panel> */}

                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Status
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <ul>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">Buy Now</p>
                                <input
                                    type="checkbox"
                                    checked={searchObj.fixed || false}
                                    onChange={e => {
                                        setSearchObj({
                                            ...searchObj,
                                            fixed: e.target.checked,
                                        });
                                    }}
                                    className="checkbox h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">On Auction</p>
                                <input
                                    type="checkbox"
                                    checked={searchObj.auction || false}
                                    onChange={e => {
                                        setSearchObj({
                                            ...searchObj,
                                            auction: e.target.checked,
                                        });
                                    }}
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            {/* <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">New</p>
                                <input
                                    type="checkbox"
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">Has Offers</p>
                                <input
                                    type="checkbox"
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li> */}
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Price
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <div className="flex flex-wrap justify-between items-center px-[10px]">
                            <select
                                value={searchObj.currency || 'ETH'}
                                onChange={e => {
                                    setSearchObj({
                                        ...searchObj,
                                        currency: e.target.value,
                                    });
                                }}
                                className="select select-bordered border-2 hover:border-[#8a939b] rounded-[10px] bg-[#202225] text-white font-semibold without-ring focus:border-[#6B7280]"
                            >
                                <option value="ETH">ETH</option>
                                <option value="WETH">WETH</option>
                            </select>
                            <input
                                value={searchObj.minPrice || ''}
                                onChange={e => {
                                    setSearchObj({
                                        ...searchObj,
                                        minPrice: e.target.value,
                                    });
                                }}
                                type="text"
                                placeholder="Min"
                                className="input input-bordered text-center border-2 w-[90px] hover:border-[#8a939b] rounded-[10px] bg-transparent text-white font-semibold without-ring focus:border-[#6B7280]"
                            />
                            <p className="text-white font-semibold text-lg">
                                to
                            </p>
                            <input
                                value={searchObj.maxPrice || ''}
                                onChange={e => {
                                    setSearchObj({
                                        ...searchObj,
                                        maxPrice: e.target.value,
                                    });
                                }}
                                type="text"
                                placeholder="Max"
                                className="input input-bordered text-center  border-2 w-[90px] hover:border-[#8a939b] rounded-[10px] bg-transparent text-white font-semibold without-ring focus:border-[#6B7280]"
                            />
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>

                {/* <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Category
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <div className="pl-0">
                            <ul>
                                {categories.map(category => (
                                    <li
                                        className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md"
                                        key={category.id}
                                    >
                                        <p className="text-white">
                                            {category.title}
                                        </p>
                                        <input
                                            type="checkbox"
                                            className="without-ring h-[24px] w-[24px] rounded-[6px] outline-none"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Accordion.Content>
                </Accordion.Panel> */}
            </Accordion>
            <div className="pr-4 mt-4">
                <select
                    value={searchObj.sort || '-createdAt'}
                    onChange={e => {
                        setSearchObj({
                            ...searchObj,
                            sort: e.target.value,
                        });
                    }}
                    className="select select-bordered border-2 w-full hover:border-[#8a939b] rounded-[10px] bg-[#202225] text-white font-semibold without-ring focus:border-[#6B7280]"
                >
                    <option value="-price">Price high to low</option>
                    <option value="price">Price low to high</option>
                    <option value="createdAt">Oldest</option>
                    <option value="-createdAt">Newest</option>
                </select>
            </div>
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
                        setPage(1);
                        router.push(`/collection/${router.query.slug}`);
                        setNfts([]);
                    }}
                    className="w-full ml-4 bg-[#2081e2] text-white font-semibold text-lg h-12 rounded-xl hover:bg-[#4c505c] transition"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}

export default FilterCollection;
