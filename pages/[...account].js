import React from 'react';
import ProfileImage from '../components/account/ProfileImage';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import NFTList from '../components/account/NFTList';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import requireAuthentication from '../components/layout/withAuth';

function AccountPage({ userAddress }) {
    return (
        <>
            <ProfileImage />
            <NFTList />
        </>
    );
}

export default AccountPage;

export function getServerSideProps(context) {
    const { req, res } = context;
    const token = req.cookies.__user_address;
    if (context.params.account[0] === 'account') {
        if (!token) {
            return {
                redirect: {
                    destination: '/login?referrer=%2Faccount',
                },
            };
        }
    }
    return {
        props: { userAddress: token }, // will be passed to the page component as props
    };
}
