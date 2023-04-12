/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

function SlideCardHorizontal({ logoImage, featuredImage, name, slug }) {
    return (
        <div className={`group rounded-xl mb-6 overflow-hidden w-[468px]`}>
            <Link href={`/collection/${slug}`}>
                <a>
                    <div className={` relative w-full h-[264px]`}>
                        <Image
                            src={featuredImage ? featuredImage : logoImage}
                            alt="featured"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="flex items-center -mt-[26px] px-6 py-4 bg-[#353840] group-hover:bg-[#4c505c] transition ease-in-out duration-400 ">
                        <div
                            className={`relative border-4 border-[#303339] rounded-[10px] overflow-hidden h-[90px] w-[90px]
                            `}
                        >
                            <Image
                                src={logoImage}
                                alt="logo"
                                layout="fill"
                                objectFit="cover"
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

export default SlideCardHorizontal;
