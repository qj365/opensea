import React, { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const ShowMore = ({ children }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="text-base text-white max-w-[900px] flex flex-col items-start mt-2">
            {showMore ? (
                <p className="max-w-[900px] break-words">{children}</p>
            ) : (
                <p className="max-w-[900px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {children}
                </p>
            )}
            {showMore ? (
                <button
                    className={`text-[#e5e8eb] hover:text-[#e5e8ebcc] flex items-center mt-2`}
                    onClick={toggleShowMore}
                >
                    See less
                    <MdExpandLess className="text-xl" />
                </button>
            ) : (
                <button
                    className={`text-[#e5e8eb] hover:text-[#e5e8ebcc] flex items-center mt-2 ${
                        children?.length < 85 && 'hidden'
                    }`}
                    onClick={toggleShowMore}
                >
                    See more
                    <MdExpandMore className="text-xl" />
                </button>
            )}
        </div>
    );
};

export default ShowMore;
