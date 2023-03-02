import React from 'react';
import requireAuthentication from '../components/layout/withAuth';
import client from '../graphql/apollo-client';
import { GET_USER_INFO } from '../graphql/query';
import { MdAccountCircle, MdNotifications } from 'react-icons/md';
import Link from 'next/link';
import ProfileSetting from '../components/settings/ProfileSetting';
import NotificationSetting from '../components/settings/NotificationSetting';

const items = [
    {
        name: 'Profile',
        icon: MdAccountCircle,
        content: ProfileSetting,
    },
    {
        name: 'Notifications',
        icon: MdNotifications,
        content: NotificationSetting,
    },
];
function SettingsPage({ userInfo, tab }) {
    const selectedTab = items.find(
        item => item.name.toLowerCase() === tab.toLowerCase()
    );
    return (
        <div className="flex">
            <div>
                <div className="sticky h-[calc(100vh-72px)] top-[72px] w-[340px] px-[20px] z-[5] border-r-[1px] border-[#353840]">
                    <div className="px-[10px] py-2">
                        <p className="font-semibold text-white text-xs my-3 tracking-[1px]">
                            SETTINGS
                        </p>
                    </div>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={`/settings?tab=${item.name.toLowerCase()}`}
                                >
                                    <a
                                        className={`${
                                            tab.toLowerCase() ===
                                                item.name.toLowerCase() &&
                                            'bg-[#1868b7] rounded-[10px] text-[#e5e8eb] overflow-hidden'
                                        } group flex items-center text-[#8a939b] p-4`}
                                    >
                                        <item.icon className="text-2xl group-hover:text-white" />
                                        <p className="text-base ml-3 font-semibold group-hover:text-white">
                                            {item.name}
                                        </p>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                {selectedTab && <selectedTab.content userInfo={userInfo} />}
            </div>
        </div>
    );
}

export default SettingsPage;

export const getServerSideProps = requireAuthentication(async context => {
    const { data } = await client.query({
        query: GET_USER_INFO,
        variables: {
            getUserByIdId: context.req.cookies.__user_address.toLowerCase(),
        },
        fetchPolicy: 'network-only',
    });
    const tab = context.query.tab || 'profile';
    return {
        props: { userInfo: data.getUserById, tab },
    };
});
