import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Tabs({ activeTabIndex, onClickTab, tabs }) {
    // const router = useRouter();

    // useEffect(() => {
    //     const activeTab = tabs[activeTabIndex];
    //     router.push(activeTab.href);
    //     console.log(activeTabIndex);
    // }, [activeTabIndex]);

    return (
        <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab, index) => (
                <li
                    className="mr-2 cursor-pointer"
                    key={index}
                    onClick={() => onClickTab(tab.index)}
                >
                    <a
                        className={`inline-block px-4 py-2 text-base  font-semibold hover:text-white transition ease-in-out duration-400 ${
                            index === activeTabIndex
                                ? 'text-[#e5e8eb] border-b-[3px] border-white'
                                : 'text-[#8a939b]'
                        }`}
                    >
                        {tab.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Tabs;
