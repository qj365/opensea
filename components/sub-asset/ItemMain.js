/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Accordion } from 'flowbite-react';

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
                    <span className="text-[15px] text-[#A6ADBA]">
                        Owned by&nbsp;
                    </span>
                    <Link href="/">
                        <a className="text-[#2081e2] hover:text-[#1868b7]">
                            king2560
                        </a>
                    </Link>
                </div>
                <div className="flex">
                    <MdVisibility className="text-2xl ml-2 text-[#A6ADBA]" />
                    <span className="text-[15px] text-[#A6ADBA]">
                        3.9K views
                    </span>
                </div>
                <div className="flex">
                    <MdFavorite className="text-2xl ml-2 text-[#A6ADBA]" />
                    <span className="text-[15px] text-[#A6ADBA]">
                        32 favorites
                    </span>
                </div>
            </div>

            {/* sale */}
            <div className="bg-[#262b2f] border-[1px] border-[#151b22] rounded-[10px]">
                <div className="flex p-5">
                    <MdSchedule className="text-2xl text-[#A6ADBA]" />
                    <span className="text-[#e5e8eb]">
                        Sale ends August 10, 2022 at 8:29am GMT+7{' '}
                    </span>
                </div>
                <div className="p-5 border-t-[1px] border-[#151b22]">
                    <span className="text-[#A6ADBA]">Current price</span>
                    <div className="flex items-center  mb-2">
                        <img
                            src={Icon.EthPriceLogo.src}
                            alt="eth"
                            className="brightness-200 w-[24px] h-[24px]"
                        />
                        <h1 className="ml-[9px] text-[#e5e8eb] text-3xl font-semibold">
                            0,99
                        </h1>
                        <span className="ml-2 text-[#A6ADBA]">($1.620,01)</span>
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
            <Accordion
                alwaysOpen={true}
                className="mt-5 bg-[#262b2f] border-0 divide-y-0"
            >
                <Accordion.Panel>
                    <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                        <div className="flex">
                            <MdTimeline className="mr-[10px] text-2xl" />
                            Price History
                        </div>
                    </Accordion.Title>
                    <Accordion.Content className="px-5 py-2">
                        <div className="pb-5">
                            <p className="text-white text-sm">
                                Geometric Ape Club is a collection of 5555
                                unique, randomly generated Apes NFTs on the
                                Ethereum blockchain.Geometric Ape Club is a
                                collection of 5555 unique, randomly generated
                                Apes NFTs on the Ethereum blockchain.
                            </p>
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            {/* listing */}
            <Accordion
                alwaysOpen={true}
                className="mt-5 bg-[#262b2f] border-0 divide-y-0"
            >
                <Accordion.Panel>
                    <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                        <div className="flex">
                            <MdLocalOffer className="mr-[10px] text-2xl" />
                            Listings
                        </div>
                    </Accordion.Title>
                    <Accordion.Content className="px-0 py-2">
                        <ul className="max-h-[332px] overflow-y-auto">
                            <li className="flex px-1 border-t-[1px] border-[#151b22]">
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
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            {/* offers */}
            <Accordion
                alwaysOpen={true}
                className="mt-5 bg-[#262b2f] border-0 divide-y-0"
            >
                <Accordion.Panel>
                    <Accordion.Title className="border-t border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                        <div className="flex">
                            <MdToc className="mr-[10px] text-2xl" />
                            Offers
                        </div>
                    </Accordion.Title>
                    <Accordion.Content className="px-5 py-2">
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
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

export default ItemMain;
