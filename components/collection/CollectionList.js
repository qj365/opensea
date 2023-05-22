import { useState } from 'react';
import { useRouter } from 'next/router';
import ItemsTab from './ItemsTab';
import Link from 'next/link';
import EventCollectionFilter from './EventCollectionFilter';

function CollectionList({ collection }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('items');
    const tabs = [
        {
            label: 'Items',
            href: '',
            component: <ItemsTab collection={collection} />,
        },
        {
            label: 'Activity',
            href: 'activity',
            component: <EventCollectionFilter collection={collection} />,
        },
    ];
    function handleTabClick(e, tab) {
        e.preventDefault();
        setActiveTab(tab.label.toLowerCase());
        router.push(`/collection/${router.query.slug}/${tab.href}`);
    }
    return (
        <div className="mt-[-120px] px-8 w-full">
            <div className="flex">
                {tabs.map((tab, index) => (
                    <div key={index}>
                        <Link
                            href={`/collection/${router.query.slug}/${tab.href}`}
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

export default CollectionList;
