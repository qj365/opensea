/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

function Card() {
    return (
        <div className="group w-[455px] rounded-xl mb-6 overflow-hidden ">
            <Link href="/">
                <a>
                    <img
                        className="w-full h-[183px] object-cover"
                        src="https://openseauserdata.com/files/210bee57eb42ac564d26abe33d1f2aa4.png"
                        alt="Sunset in the mountains"
                    />
                    <div className="flex items-center -mt-[26px] px-6 py-4 bg-[#353840] group-hover:bg-[#4c505c] transition ease-in-out duration-400 ">
                        <div className="border-4 border-[#303339] rounded-[4px] overflow-hidden z-10">
                            <img
                                className="h-[70px] w-[70px]"
                                src="https://openseauserdata.com/files/68377331e92e84100a24261a9bf341d3.jpg"
                                alt="sun"
                            />
                        </div>
                        <div className="pl-4 text-white font-semibold text-xl mb-2">
                            The Coldest Sunset
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default Card;
