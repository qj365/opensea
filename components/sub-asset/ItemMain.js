/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {
    MdRefresh,
    MdOutlineOpenInNew,
    MdShare,
    MdMoreVert,
    MdVisibility,
    MdFavorite,
    MdSchedule,
    MdAccountBalanceWallet,
    MdLocalOffer,
    MdTimeline,
    MdToc,
} from 'react-icons/md';
import Icon from '../../assets/icons';

function ItemMain() {
    return (
        <div className="flex-[4_0_0%] flex-col my-5 ">
            {/* title */}
            <div>
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <a className="text-[#2081e2] hover:text-[#1868b7]">
                            Famous Ape Social Club
                        </a>
                    </Link>

                    <div className="inline-flex">
                        <button className="outline-0 bg-#202225 border-2 border-[#4c505c] p-[11px] rounded-l-[10px] hover:border-[#8a939b]">
                            <MdRefresh className="text-white text-[22px]" />
                        </button>
                        <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] hover:border-[#8a939b]">
                            <MdOutlineOpenInNew className="text-white text-[22px]" />
                        </button>
                        <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] hover:border-[#8a939b]">
                            <MdShare className="text-white text-[22px]" />
                        </button>
                        <button className="outline-0 ml-[-2px] bg-#202225 border-2 border-[#4c505c] p-[11px] rounded-r-[10px] hover:border-[#8a939b]">
                            <MdMoreVert className="text-white text-[22px]" />
                        </button>
                    </div>
                </div>
                <h1 className="font-semibold text-[#e5e8eb] text-3xl">
                    YOLO HOLIDAY #4096
                </h1>
            </div>

            {/* counter */}
            <div className="flex my-5">
                <div>
                    <span className="text-[15px]">Owned by&nbsp;</span>
                    <Link href="/">
                        <a className="text-[#2081e2] hover:text-[#1868b7]">
                            king2560
                        </a>
                    </Link>
                </div>
                <div className="flex">
                    <MdVisibility className="text-2xl ml-2" />
                    <span className="text-[15px]">3.9K views</span>
                </div>
                <div className="flex">
                    <MdFavorite className="text-2xl ml-2" />
                    <span className="text-[15px]">32 favorites</span>
                </div>
            </div>

            {/* sale */}
            <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px]">
                <div className="flex p-5">
                    <MdSchedule className="text-2xl" />
                    <span className="text-[#e5e8eb]">
                        Sale ends August 10, 2022 at 8:29am GMT+7{' '}
                    </span>
                </div>
                <div className="p-5 border-t-[1px] border-[#151b22]">
                    <span>Current price</span>
                    <div className="flex items-center  mb-2">
                        <img
                            src={Icon.EthPriceLogo.src}
                            alt="eth"
                            className="brightness-200 w-[24px] h-[24px]"
                        />
                        <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                            0,99
                        </h1>
                        <span className="ml-2">($1.620,01)</span>
                    </div>
                    <div className="flex">
                        <button className="flex h-full w-[206px] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#2081e2] hover:bg-[#2e8eee] rounded-xl text-white font-semibold ">
                            <MdAccountBalanceWallet className="mr-3" />
                            <span>Make offer</span>
                        </button>
                        <button className="ml-2 flex w-[206px] justify-center items-center px-6 py-[17px] border-2 border-transparent bg-[#353840] hover:bg-[#4c505c] rounded-xl text-white font-semibold ">
                            <MdLocalOffer className="mr-3" />
                            <span>Make offer</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* chart */}
            <div className="my-5 rounded-[10px] collapse collapse-arrow border-t border-[#151b22] bg-[#262b2f]">
                <input type="checkbox" />
                <div className="flex collapse-title font-semibold text-white p-5 fle items-center ">
                    <MdTimeline className="mr-[10px] text-2xl" />
                    Price History
                </div>

                <div className="collapse-content">
                    <div className="px-2 pb-5">
                        <p className="text-white text-sm">
                            Geometric Ape Club is a collection of 5555 unique,
                            randomly generated Apes NFTs on the Ethereum
                            blockchain.Geometric Ape Club is a collection of
                            5555 unique, randomly generated Apes NFTs on the
                            Ethereum blockchain.
                        </p>
                    </div>
                </div>
            </div>

            {/* listing */}
            <div className="my-5 rounded-[10px] collapse collapse-arrow border-t border-[#151b22] bg-[#262b2f]">
                <input type="checkbox" />
                <div className="flex collapse-title font-semibold text-white p-5 fle items-center ">
                    <MdLocalOffer className="mr-[10px] text-2xl" />
                    Listings
                </div>

                <div className="collapse-content">
                    <ul className="max-h-[332px] overflow-y-auto">
                        <li className="flex border-t-[1px] border-[#151b22]">
                            <div className="text-[#e5e8eb] text-[15px] w-full pl-4 pr-2 py-1">
                                Price
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                USD Price
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                Expiration
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                From
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1"></div>
                        </li>
                        <li className="flex items-center border-t-[1px] border-[#151b22]">
                            <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                <img
                                    src={Icon.EthPriceLogo.src}
                                    alt="eth"
                                    className="brightness-200 w-[16px] h-[16px]"
                                />
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
                                    data-tip="September 10, 2022 at 8:29am GMT+7"
                                >
                                    <button className="text-[#e5e8eb] text-[15px]">
                                        about 1 month
                                    </button>
                                </div>
                            </div>
                            <div className="py-4 px-2 w-full truncate max-w-[50%]">
                                <Link href="/">
                                    <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                        C05D74C05D74C05D74C05D74C05D74C05D74
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full py-4 pr-4 pl-2">
                                <button className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-6 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-all">
                                    Buy
                                </button>
                            </div>
                        </li>
                        <li className="flex items-center border-t-[1px] border-[#151b22]">
                            <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                <img
                                    src={Icon.EthPriceLogo.src}
                                    alt="eth"
                                    className="brightness-200 w-[16px] h-[16px]"
                                />
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
                                    data-tip="September 10, 2022 at 8:29am GMT+7"
                                >
                                    <button className="text-[#e5e8eb] text-[15px]">
                                        about 1 month
                                    </button>
                                </div>
                            </div>
                            <div className="py-4 px-2 w-full truncate max-w-[50%]">
                                <Link href="/">
                                    <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                        C05D74C05D74C05D74C05D74C05D74C05D74
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full py-4 pr-4 pl-2">
                                <button className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-6 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-all">
                                    Buy
                                </button>
                            </div>
                        </li>
                        <li className="flex items-center border-t-[1px] border-[#151b22]">
                            <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                <img
                                    src={Icon.EthPriceLogo.src}
                                    alt="eth"
                                    className="brightness-200 w-[16px] h-[16px]"
                                />
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
                                    data-tip="September 10, 2022 at 8:29am GMT+7"
                                >
                                    <button className="text-[#e5e8eb] text-[15px]">
                                        about 1 month
                                    </button>
                                </div>
                            </div>
                            <div className="py-4 px-2 w-full truncate max-w-[50%]">
                                <Link href="/">
                                    <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                        C05D74C05D74C05D74C05D74C05D74C05D74
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full py-4 pr-4 pl-2">
                                <button className="text-white bg-[#353840] rounded-xl font-semibold py-[11px] px-6 border-2 border-[#353840] hover:bg-[#4c505c] hover:border-transparent transition-all">
                                    Buy
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* offers */}
            <div className="my-5 rounded-[10px] collapse collapse-arrow border-t border-[#151b22] bg-[#262b2f]">
                <input type="checkbox" />
                <div className="flex collapse-title font-semibold text-white p-5 fle items-center ">
                    <MdToc className="mr-[10px] text-2xl" />
                    Offers
                </div>

                <div className="collapse-content">
                    <ul className="max-h-[332px] overflow-y-auto">
                        <li className="flex border-t-[1px] border-[#151b22]">
                            <div className="text-[#e5e8eb] text-[15px] w-full pl-4 pr-2 py-1 mr-[-1px]">
                                Price
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                USD Price
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1 text-left">
                                Floor Difference
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                Expiration
                            </div>
                            <div className="text-[#e5e8eb] text-[15px] w-full px-2 py-1">
                                From
                            </div>
                        </li>

                        <li className="flex items-center border-t-[1px] border-[#151b22]">
                            <div className="flex items-center py-4 pl-4 pr-3 w-full">
                                <img
                                    src={Icon.EthPriceLogo.src}
                                    alt="eth"
                                    className="brightness-200 w-[16px] h-[16px]"
                                />
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
        </div>
    );
}

export default ItemMain;
