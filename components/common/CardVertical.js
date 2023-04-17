/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Icon from './../../assets/icons';
import Image from 'next/image';

function CardVertical({ w = 256, h = 256, nft }) {
    return (
        <div className={`group w-[256px] rounded-xl overflow-hidden relative`}>
            <Link href={`/assets/${nft.collectionNft._id}/${nft.tokenId}`}>
                <a className="group ">
                    <div
                        className={`w-full h-[256px] overflow-hidden relative`}
                    >
                        <Image
                            className={`w-full h-[256px] object-cover group-hover:scale-110 transition ease-in-out duration-500`}
                            src={nft.media}
                            alt="media"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="z-10 px-4 py-3 bg-[#353840] group-hover:bg-[#4c505c] transition ease-in-out duration-400 ">
                        <div className="w-[80%]">
                            <p className="text-white font-semibold text-sm truncate">
                                {nft.name}
                            </p>
                            <p className="text-white font-normal text-sm truncate">
                                {nft.collectionNft.name}
                            </p>
                        </div>
                        <div className="h-[42px] mt-3 w-[90%] truncate">
                            {nft.listing && (
                                <>
                                    <p className="text-white font-semibold text-xs">
                                        Price
                                    </p>
                                    <div className="flex items-center">
                                        {nft.listing.currency === 'ETH' ? (
                                            <img
                                                src={Icon.EthLogo.src}
                                                alt="ETH Logo"
                                                className="h-4 brightness-200"
                                            />
                                        ) : (
                                            <img
                                                src={Icon.wethLogo.src}
                                                alt="ETH Logo"
                                                className="h-4 brightness-200"
                                            />
                                        )}

                                        <div className="ml-1">
                                            <span className="text-white font-semibold ml-2">
                                                {nft.listing.price +
                                                    ' ' +
                                                    nft.listing.currency}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="h-[24px]"></div>
                        <div>
                            <button className="font-semibold translate-y-full opacity-0 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible group-hover: duration-[300ms] h-[38px] w-full absolute left-0 bottom-0 text-white text-sm bg-[#2081e2]">
                                View detail
                            </button>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default CardVertical;
