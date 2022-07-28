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
            <div className="collapse collapse-arrow">
                <input
                    type="checkbox"
                    className="hover:bg-black hover:rounded-md z-50"
                />
                <div className="collapse-title font-semibold text-white h-12 pl-[10px] ">
                    Status
                </div>

                <div className="collapse-content pl-0">
                    <ul>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">Buy Now</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">On Auction</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">New</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">Has Offers</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input
                    type="checkbox"
                    className="hover:bg-black hover:rounded-md z-50"
                />
                <div className="collapse-title font-semibold text-white h-12 pl-[10px] ">
                    Status
                </div>

                <div className="collapse-content pl-0">
                    <ul>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">Buy Now</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">On Auction</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">New</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                        <li className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md">
                            <p className="text-white">Has Offers</p>
                            <input
                                type="checkbox"
                                className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="collapse collapse-arrow">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-white h-12 pl-[10px] hover:bg-black hover:rounded-md ">
                    Price
                </div>
                <div className="collapse-content pl-0">
                    <div className="flex flex-wrap justify-between items-center px-[10px]">
                        <select
                            className="select select-bordered border-2 hover:border-[#8a939b]"
                            style={{ outline: 'none' }}
                        >
                            <option className="">USD</option>
                            <option>ETH</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Min"
                            className="input input-bordered text-center border-2 w-[90px] hover:border-[#8a939b]"
                            style={{ outline: 'none' }}
                        />
                        <p className="text-white font-semibold text-lg">to</p>
                        <input
                            type="text"
                            placeholder="Max"
                            className="input input-bordered text-center  border-2 w-[90px] hover:border-[#8a939b]"
                            style={{ outline: 'none' }}
                        />
                    </div>
                    <div className="my-4 px-[10px]">
                        <button className="w-full bg-[#2081e2] text-white font-semibold text-lg h-12 rounded-xl hover:bg-[#4c505c] transition">
                            Aplly
                        </button>
                    </div>
                </div>
            </div>

            <div className="collapse collapse-arrow">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-white h-12 pl-[10px] hover:bg-black hover:rounded-md ">
                    Category
                </div>
                <div className="collapse-content pl-0">
                    <ul>
                        {categories.map(category => (
                            <li
                                className="h-12 px-[10px] flex justify-between items-center cursor-pointer hover:bg-[#35384033] hover:rounded-md"
                                key={category.id}
                            >
                                <p className="text-white">{category.title}</p>
                                <input
                                    type="checkbox"
                                    className="checkbox  h-[24px] w-[24px] rounded-[6px] outline-none"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Filter;
