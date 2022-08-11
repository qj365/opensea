/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Icon from './../../assets/icons';
import { MdFavoriteBorder } from 'react-icons/md';
import CardItem from './CardItem';
import DescriptionItem from './DescriptionItem';

function ItemSummary() {
    return (
        <div className="flex-[3_0_0%] flex-col max-w-[43%]">
            <CardItem />
            <DescriptionItem />
        </div>
    );
}

export default ItemSummary;
