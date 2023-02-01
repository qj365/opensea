import { Accordion } from 'flowbite-react';

const categories = [
    {
        id: 2,
        title: 'Art',
    },
    {
        id: 3,
        title: 'Collectibles',
    },
    {
        id: 4,
        title: 'Domain Names',
    },
    {
        id: 5,
        title: 'Music',
    },
    {
        id: 6,
        title: 'Photography',
    },
    {
        id: 7,
        title: 'Sports',
    },
];

function Filter() {
    return (
        <div className="h-[calc(100vh-72px)] w-1/4 overflow-y-auto sticky top-[72px]">
            <Accordion alwaysOpen={true} className="border-0 pr-4 divide-y-0">
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
                                    className="checkbox h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">On Auction</p>
                                <input
                                    type="checkbox"
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
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
                            </li>
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>

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
                                    className="checkbox h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                                <p className="text-white">On Auction</p>
                                <input
                                    type="checkbox"
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] without-ring"
                                />
                            </li>
                            <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
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
                            </li>
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title className="bg-transparent font-semibold text-white hover:bg-[#35384033] focus:ring-0 rounded-[10px] px-2">
                        Price
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-0">
                        <div className="flex flex-wrap justify-between items-center px-[10px]">
                            <select className="select select-bordered border-2 hover:border-[#8a939b] rounded-[10px] bg-[#202225] text-white font-semibold without-ring focus:border-[#6B7280]">
                                <option className="">USD</option>
                                <option>ETH</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Min"
                                className="input input-bordered text-center border-2 w-[90px] hover:border-[#8a939b] rounded-[10px] bg-transparent text-white font-semibold without-ring focus:border-[#6B7280]"
                            />
                            <p className="text-white font-semibold text-lg">
                                to
                            </p>
                            <input
                                type="text"
                                placeholder="Max"
                                className="input input-bordered text-center  border-2 w-[90px] hover:border-[#8a939b] rounded-[10px] bg-transparent text-white font-semibold without-ring focus:border-[#6B7280]"
                            />
                        </div>
                        <div className="my-4 px-[10px]">
                            <button className="w-full bg-[#2081e2] text-white font-semibold text-lg h-12 rounded-xl hover:bg-[#4c505c] transition">
                                Apply
                            </button>
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
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
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

export default Filter;
