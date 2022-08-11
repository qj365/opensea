import React from 'react';
import ItemMain from './ItemMain';
import ItemSummary from './ItemSummary';

function ItemWrapper() {
    return (
        <div className="flex w-[1280px] m-auto">
            <ItemSummary />
            <ItemMain />
        </div>
    );
}

export default ItemWrapper;
