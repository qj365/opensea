/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

function CardHorizontal({
    logoImage,
    featuredImage,
    name,
    slug,
    w = 455,
    h = 183,
}) {
    return (
        <div className={`group w-[302px] rounded-xl mb-6 overflow-hidden `}>
            <Link href={`/collection/${slug}`}>
                <a>
                    <img
                        className={`w-full h-[107px] object-cover`}
                        src={featuredImage ? featuredImage : logoImage}
                        alt="Sunset in the mountains"
                    />
                    <div className="flex items-center -mt-[26px] px-6 py-4 bg-[#353840] group-hover:bg-[#4c505c] transition ease-in-out duration-400 ">
                        <div className="border-4 border-[#303339] rounded-[10px] overflow-hidden ">
                            <img
                                className="h-[70px] w-[70px] object-cover"
                                src={logoImage}
                                alt="sun"
                            />
                        </div>
                        <div className="pl-4 text-white font-semibold text-xl mt-4 mb-2 truncate max-w-[80%]">
                            {name}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default CardHorizontal;
