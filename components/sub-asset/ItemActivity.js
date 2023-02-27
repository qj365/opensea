import Link from 'next/link';
import {
    MdSwapVert,
    MdSell,
    MdMultipleStop,
    MdShoppingCart,
    MdMoney,
    MdOpenInNew,
} from 'react-icons/md';
import { Accordion, Tooltip, Table } from 'flowbite-react';
import Select from 'react-select';

const options = [
    { value: 'Sale', label: 'Sales' },
    { value: 'Listing', label: 'Listings' },
    { value: 'Offer', label: 'Offers' },
    { value: 'Transfer', label: 'Transfers' },
];

function ItemActivity() {
    return (
        <Accordion
            alwaysOpen={true}
            className="mt-5 ml-4 bg-[#262b2f] border-0 divide-y-0"
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
                        name="colors"
                        options={options}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: 'transparent',
                                padding: '4px 0',
                                border: state.menuIsOpen
                                    ? 'solid 2px #8a939b'
                                    : 'solid 2px #4c505c',
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
                        }}
                        className="react-select-container"
                        classNamePrefix="select"
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
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-t-[1px] border-[#151b22]">
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            <span className="flex">
                                                <MdShoppingCart className="mr-[10px] text-2xl" />
                                                Sale
                                            </span>
                                        </td>
                                        <td className="text-[#e5e8eb] text-[15px] py-4 w-1/5">
                                            0.033 ETH
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <Link href="/">
                                                <a className="text-[15px] text-[#2081e2] hover:text-[#1868b7]">
                                                    Quang
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="py-4 w-1/5">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="/"
                                                className="text-[15px] text-[#2081e2] hover:text-[#1868b7] inline-block max-w-full"
                                            >
                                                <Tooltip content="Tooltip content">
                                                    <div className="flex">
                                                        2 hours ago
                                                        <MdOpenInNew className="ml-[10px] text-2xl" />
                                                    </div>
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
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
