import Link from 'next/link';
import { MdSwapVert, MdToc } from 'react-icons/md';

function ItemActivity() {
    return (
        <div className="ml-5 rounded-[10px] collapse collapse-arrow border-t border-[#151b22] bg-[#262b2f]">
            <input type="checkbox" checked />
            <div className="flex collapse-title font-semibold text-white p-5 fle items-center ">
                <MdSwapVert className="mr-[10px] text-2xl" />
                Item Activity
            </div>

            <div className="collapse-content">
                <div className="border-t-[1px] border-[#151b22]">
                    <input
                        type="text"
                        disabled
                        readOnly
                        placeholder="Filler"
                        className="m-auto my-4 p-3 w-full cursor-pointer rounded-[10px] bg-[#262b2f] border-2 border-[#4c505c] hover:border-[#8a939b]"
                    />
                </div>
                <ul className="max-h-[332px] overflow-y-auto">
                    <li className="flex items-center border-t-[1px] border-[#151b22]">
                        <div className="flex items-center py-4 pl-4 pr-3 w-full">
                            <span className="text-[#e5e8eb] text-[15px] font-semibold mx-[4.5px]">
                                0,99
                            </span>
                            <span className="text-[#e5e8eb] text-[15px] ">
                                ETH
                            </span>
                        </div>
                        <div className="py-4 px-2 w-full">
                            <span className="text-[#e5e8eb] text-[15px] ">
                                $1.601,21
                            </span>
                        </div>
                        <div className="py-4 px-3 w-full">
                            <div
                                className="tooltip tooltip-primary tooltip-top"
                                data-tip="Collection floor price: 0.66 ETH"
                            >
                                <button className="text-[#e5e8eb] text-[15px]">
                                    33% below
                                </button>
                            </div>
                        </div>
                        <div className="py-4 px-2 w-full">
                            <div
                                className="tooltip tooltip-primary tooltip-top"
                                data-tip="September 10, 2022 at 8:29am GMT+7"
                            >
                                <button className="text-[#e5e8eb] text-[15px]">
                                    3 days
                                </button>
                            </div>
                        </div>
                        <div className="w-full py-4 pr-4 pl-2 truncate max-w-[80%]">
                            <Link href="/">
                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                    C05D74C05D74C05D74
                                </a>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ItemActivity;
