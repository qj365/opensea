import Link from 'next/link';
import {
    MdSwapVert,
    MdSell,
    MdMultipleStop,
    MdShoppingCart,
    MdMoney,
    MdOpenInNew,
    MdAutoAwesome,
    MdCancel,
} from 'react-icons/md';
import { Accordion, Tooltip, Table } from 'flowbite-react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { timeElapsed, formatToUSDate } from '../../utils/formatDate';

const options = [
    {
        value: 'Sale',
        label: 'Sale',
        icon: <MdShoppingCart className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Listing',
        label: 'Listing',
        icon: <MdSell className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Offer',
        label: 'Offer',
        icon: <MdMultipleStop className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Mint',
        label: 'Mint',
        icon: <MdAutoAwesome className="mr-[10px] text-2xl" />,
    },
    {
        value: 'Cancel',
        label: 'Cancel',
        icon: <MdCancel className="mr-[10px] text-2xl" />,
    },
];
const styleSelect = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'transparent',
        padding: '4px 0',
        border: state.menuIsOpen ? 'solid 2px #8a939b' : 'solid 2px #4c505c',
        borderRadius: '10px',
        boxShadow: 'none',
        ':hover': {
            border: 'solid 2px #8a939b',
            cursor: 'pointer',
            boxShadow: 'none',
        },
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: '#262b2f',
        color: 'white',
    }),
    option: (baseStyles, state) => ({
        padding: '10px 15px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#4c505c',
        },
    }),
    multiValue: (baseStyles, state) => ({
        ...baseStyles,
        color: 'white',
        backgroundColor: '#4c505c',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '2px',
    }),
    multiValueLabel: baseStyles => ({
        ...baseStyles,
        color: 'white',
    }),
    input: baseStyles => ({
        ...baseStyles,
        opacity: 0,
    }),
};

function ItemActivity({ nft, address }) {
    const [events, setEvents] = useState([]);
    const [eventFilter, setEventFilter] = useState([]);
    useEffect(() => {
        if (nft.events) {
            const excludeOffers = nft.events.filter(
                e => e.eventName !== 'Offer'
            );
            setEvents(nft.events);

            if (eventFilter.length > 0) {
                setEvents(
                    nft.events.filter(e => eventFilter.includes(e.eventName))
                );
            }
        }
    }, [nft, eventFilter]);

    return (
        <Accordion
            alwaysOpen={true}
            className="mt-5 bg-[#262b2f] border-0 divide-y-0"
        >
            <Accordion.Panel>
                <Accordion.Title className="border-b border-[#151b22] px-5 py-4 bg-transparent font-semibold text-white focus:ring-0 hover:bg-transparent ">
                    <div className="flex">
                        <MdSwapVert className="mr-[10px] text-2xl" />
                        Item Activity
                    </div>
                </Accordion.Title>
                <Accordion.Content className="px-5 py-2">
                    <Select
                        placeholder="Filler"
                        isMulti
                        name="events"
                        options={options}
                        styles={styleSelect}
                        className="react-select-container"
                        classNamePrefix="select"
                        onChange={e => {
                            setEventFilter(e.map(e => e.value));
                        }}
                    />
                    <div className="pt-3">
                        <div className="max-h-[332px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#171a1c] scrollbar-track-transparent">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Event
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Unit Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            From
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            To
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-[#e5e8eb] font-normal text-[15px] py-1 text-left"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((e, i) => (
                                        <tr
                                            className="border-t-[1px] border-[#151b22]"
                                            key={i}
                                        >
                                            <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                                <span className="flex">
                                                    {
                                                        options.find(
                                                            option =>
                                                                option.value ===
                                                                e.eventName
                                                        )?.icon
                                                    }
                                                    {e.eventName}
                                                </span>
                                            </td>
                                            <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                                {e.price
                                                    ? `${e.price} ${e.currency}`
                                                    : ''}
                                            </td>
                                            <td className="py-4 w-1/5">
                                                {e?.from?._id && (
                                                    <Link
                                                        href={`/${e.from._id}`}
                                                    >
                                                        <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                            {e.from._id ===
                                                            address
                                                                ? 'you'
                                                                : e.from
                                                                      .username ===
                                                                  'Unnamed'
                                                                ? e.from._id
                                                                      .slice(-6)
                                                                      .toUpperCase()
                                                                : e.from
                                                                      .username}
                                                        </a>
                                                    </Link>
                                                )}
                                            </td>
                                            <td className="py-4 w-1/5">
                                                {e?.to?._id && (
                                                    <Link
                                                        href={`/${e.to?._id}`}
                                                    >
                                                        <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                            {e.to._id ===
                                                            address
                                                                ? 'you'
                                                                : e.to
                                                                      .username ===
                                                                  'Unnamed'
                                                                ? e.to._id
                                                                      .slice(-6)
                                                                      .toUpperCase()
                                                                : e.to.username}
                                                        </a>
                                                    </Link>
                                                )}
                                            </td>
                                            {e.transactionHash ? (
                                                <td className="py-4 w-1/5">
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={
                                                            process.env
                                                                .NEXT_PUBLIC_ETHERSCAN_LINK +
                                                            e.transactionHash
                                                        }
                                                        className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                                    >
                                                        <Tooltip
                                                            content={formatToUSDate(
                                                                e.startTimestamp
                                                            )}
                                                        >
                                                            <div className="flex">
                                                                {timeElapsed(
                                                                    e.startTimestamp
                                                                )}
                                                                <MdOpenInNew className="ml-[10px] text-2xl" />
                                                            </div>
                                                        </Tooltip>
                                                    </a>
                                                </td>
                                            ) : (
                                                <td className="py-4 w-1/5">
                                                    <div className="text-[15px] text-white inline-block max-w-full">
                                                        <Tooltip
                                                            content={formatToUSDate(
                                                                e.startTimestamp
                                                            )}
                                                        >
                                                            <div className="flex">
                                                                {timeElapsed(
                                                                    e.startTimestamp
                                                                )}
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default ItemActivity;
