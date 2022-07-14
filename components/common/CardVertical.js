/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Icon from './../../assets/icons';

function CardVertical() {
    return (
        <div className="group w-[359px] rounded-xl mb-6 overflow-hidden relative">
            <Link href="/">
                <a className="group ">
                    <div className="w-full h-[359px] overflow-hidden">
                        <img
                            className="w-full h-[359px] object-cover group-hover:scale-110 transition ease-in-out duration-500"
                            src="https://lh3.googleusercontent.com/y87JgdID9UCmezbhU42ifgGp5h1yvZSCGwaOlj_47c1zCUVAKnU1vF_zxV5_3XH6h2VoqG2Qx-spZ--G6hmMTsygVyeY6e7BDQD-=w359"
                            alt="Sunset in the mountains"
                        />
                    </div>
                    <div className="px-4 py-3 bg-[#353840] group-hover:bg-[#4c505c] transition ease-in-out duration-400 ">
                        <div className="w-[80%]">
                            <p className="text-white font-semibold text-xs truncate">
                                Famous Ape #22850 Famous Ape #22850 Famous Ape
                                Famous Ape #22850 Famous Ape #22850 #22850
                            </p>
                            <p className="text-white font-normal text-xs truncate">
                                Famous Ape Social Club
                            </p>
                        </div>
                        <div className="mt-3 w-[40%]">
                            <p className="text-white font-semibold text-xs">
                                Price
                            </p>
                            <div className="flex items-center">
                                <img
                                    src={Icon.EthLogo.src}
                                    alt="ETH Logo"
                                    className="h-4 brightness-200"
                                />
                                <div className="ml-1">
                                    <span className="text-white font-semibold">
                                        0,077
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-6 text-xs">a day left</div>
                            <button className="translate-y-full opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover: duration-[300ms] h-[38px] w-full absolute left-0 bottom-0 text-white font-medium text-sm bg-[#2081e2]">
                                Buy now
                            </button>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default CardVertical;
