import { useCallback, useState } from 'react';
import Tabs from '../common/Tabs';
import { useRouter } from 'next/router';
import Link from 'next/link';

function NFTList() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabs = [
        { label: 'Created', href: '/created' },
        { label: 'Collection', href: '/collection' },
        { label: 'Activity', href: '/activity' },
    ];

    const router = useRouter();

    const handleTabClick = useCallback(tabIndex => {
        setActiveTabIndex(tabIndex);
        // router.push(`/account/${router.query.index}`);
        console.log(router.query, tabIndex);
    }, []);
    return (
        <div className="mt-[-120px] px-8">
            {/* <Tabs
                activeTabIndex={activeTabIndex}
                onClickTab={handleTabClick}
                tabs={tabs}
            />
            {activeTabIndex === 0 && <>ComponentA</>}
            {activeTabIndex === 1 && <>ComponentB</>} */}
            <Link href={'/assets/1'}>
                <a>Home</a>
            </Link>
        </div>
    );
}

export default NFTList;
