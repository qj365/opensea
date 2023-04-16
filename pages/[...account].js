import React from 'react';
import ProfileImage from '../components/account/ProfileImage';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import NFTList from '../components/account/NFTList';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import requireAuthentication from '../components/layout/withAuth';
import client from '../graphql/apollo-client';
import { GET_USER_INFO } from '../graphql/query';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { SidebarContext } from '../context/sidebar-context';

function AccountPage({ userInfo, token }) {
    const { sidebarIsVisible, hideSidebar } = useContext(SidebarContext);
    useEffect(() => {
        if (sidebarIsVisible) {
            hideSidebar();
        }
    }, []);
    return (
        <>
            <ProfileImage userInfo={userInfo} token={token} />
            <NFTList token={token} />
            <div className="mb-8"></div>
        </>
    );
}

export default AccountPage;

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req.cookies.__user_address || null;

    let userInfo;
    if (context.params.account[0].toLowerCase() === 'account') {
        if (!token) {
            return {
                redirect: {
                    destination: '/login?referrer=%2Faccount',
                },
            };
        }
        const { data } = await client.query({
            query: GET_USER_INFO,
            variables: { getUserByIdId: token.toLowerCase() },
            fetchPolicy: 'network-only',
        });
        userInfo = data.getUserById;
    } else {
        const { data } = await client.query({
            query: GET_USER_INFO,
            variables: {
                getUserByIdId: context.params.account[0].toLowerCase(),
            },
            fetchPolicy: 'network-only',
        });
        if (!data) {
            return {
                notFound: true,
            };
        }
        userInfo = data.getUserById;
    }
    return {
        props: { userInfo, token }, // will be passed to the page component as props
    };
}
