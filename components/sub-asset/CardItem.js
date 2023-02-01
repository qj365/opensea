/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Icon from './../../assets/icons';
import { MdFavoriteBorder } from 'react-icons/md';
function CardItem() {
    return (
        <div className="rounded-[10px] overflow-hidden w-[508px] m-5">
            <div className="w-full bg-[#303339] h-[42px] flex items-center justify-between p-3">
                <div className="h-full">
                    <Image
                        src={Icon.EthLogo.src}
                        alt="eth"
                        width={12}
                        height={23}
                    />
                </div>
                <div className="flex h-full">
                    <p className="text-xs mr-2 mt-[2px] text-[#A6ADBA]">15</p>
                    <button className="group">
                        <MdFavoriteBorder className="text-xl text-[#A6ADBA] group-hover:text-white" />
                    </button>
                </div>
            </div>
            <Image
                src="https://lh3.googleusercontent.com/i3Iqyus4sFZCVQK2z7NpCq8EqUaXWfEqmWQtF4cJ59-2VRsbgT9-5qGU7hjU8A_XO29KiiEgEjaGPKg1f9iGJzSBoXQhytBdx-3jV2g=w600"
                alt="nft-item"
                height={508}
                width={508}
                className="rounded-b-[10px] overflow-hidden"
            />
        </div>
    );
}

export default CardItem;
