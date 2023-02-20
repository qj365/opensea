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

function AccountPage({ userInfo, token }) {
    useEffect;
    return (
        <>
            <ProfileImage userInfo={userInfo} token={token} />
            <NFTList />
        </>
    );
}

export default AccountPage;

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req.cookies.__user_address;
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
        });
        userInfo = data.getUserById;
    } else {
        const { data } = await client.query({
            query: GET_USER_INFO,
            variables: {
                getUserByIdId: context.params.account[0].toLowerCase(),
            },
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
