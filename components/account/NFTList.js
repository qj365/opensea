import { useCallback, useState, useEffect } from 'react';
import Tabs from '../common/Tabs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CollectedTab from './CollectedTab';
import CreatedTab from './CreatedTab';

function NFTList({ token }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('collected');
    const tabs = [
        {
            label: 'Collected',
            href: '/collected',
            component: <CollectedTab token={token} />,
        },
        {
            label: 'Created',
            href: '/created',
            component: <CreatedTab token={token} />,
        },
        { label: 'Activity', href: '/activity' },
    ];
    function handleTabClick(e, tab) {
        e.preventDefault();
        setActiveTab(tab.label.toLowerCase());
        router.push(`/${router.query.account[0]}${tab.href}`);
    }
    return (
        <div className="mt-[-120px] px-8 w-full">
            <div className="flex">
                {tabs.map((tab, index) => (
                    <div key={index}>
                        <Link
                            href={`/${router.query.account[0]}${tab.href}`}
                            scroll={false}
                        >
                            <a
                                className={`text-base font-semibold mr-8 tracking-wide pb-[10px] hover:text-white ${
                                    activeTab === tab.label.toLowerCase()
                                        ? 'text-white border-b-[3px] border-white'
                                        : 'text-[#8a939b]'
                                }`}
                                onClick={e => handleTabClick(e, tab)}
                            >
                                {tab.label}
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            <hr className="border-t-0 border-b-[1px] border-[#353840] pt-[10px]" />

            <div>
                {
                    tabs.find(tab => tab.label.toLowerCase() === activeTab)
                        .component
                }
            </div>
        </div>
    );
}

export default NFTList;
