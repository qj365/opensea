/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

import { MdOutlineSubject, MdVerticalSplit, MdBallot } from 'react-icons/md';
function DescriptionItem() {
    return (
        <div className="m-5 mt-0 w-[508px] bg-[#262b2f] rounded-[10px]">
            <div className="flex p-5">
                <MdOutlineSubject className="text-white text-2xl mr-[10px]" />
                <span className="text-white font-semibold">Description</span>
            </div>
            <div className="p-5 border-t border-[#151b22]">
                <div className="flex">
                    <p className="text-white bold">By &nbsp;</p>
                    <Link href="/">
                        <a className="text-white font-bold">E154BD</a>
                    </Link>
                </div>

                <p className="text-white text-sm">
                    The Geometric Ape Club is a collection of 6666 unique,
                    randomly generated Apes NFTs on the Ethereum blockchain.
                </p>
            </div>

            <div className="collapse collapse-arrow border-t border-[#151b22]">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-white p-5 flex">
                    <MdVerticalSplit className="text-white text-2xl mr-[10px]" />
                    About ...
                </div>

                <div className="collapse-content">
                    <div className="px-2 pb-5">
                        <Link href="/">
                            <a className="mt-[3px] mr-[10px] w-[80px] rounded-[10px] overflow-hidden float-left">
                                <img
                                    src="https://lh3.googleusercontent.com/SkvBi5DZh9lBzbRT3TnIJ_E__HrmFh79ysePq2dmG4tidZYf8oeND6JFsUOAAJq9lEc4OuZ3qmPBXZSSip91jQtqgZZT5QJKwE7NkQ=w128"
                                    alt="avatar"
                                />
                            </a>
                        </Link>

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

            <div className="collapse collapse-arrow border-t border-[#151b22] overflow-visible">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-white p-5 flex">
                    <MdBallot className="text-white text-2xl mr-[10px]" />
                    Details
                </div>

                <div className="collapse-content ">
                    <div className="px-2 pb-5">
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Contract Address
                            </span>
                            <Link href="/">
                                <a className="text-[#207fe2] text-sm hover:text-[#1868b7]">
                                    0x495f...7b5e
                                </a>
                            </Link>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Token ID
                            </span>
                            <div
                                className="tooltip tooltip-primary tooltip-bottom"
                                data-tip="Copy"
                            >
                                <button className="text-sm font-medium">
                                    6124328250330320...
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Token Standard
                            </span>
                            <span className="text-sm font-medium">
                                ERC-1155
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Blockchain
                            </span>
                            <span className="text-sm font-medium">
                                Ethereum
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Metadata
                            </span>
                            <span className="text-sm font-medium">
                                Centralized
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-white text-[15px]">
                                Creator Earnings
                            </span>
                            <span className="text-sm font-medium">5%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescriptionItem;
