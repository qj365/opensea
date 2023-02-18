import React from 'react';
import ProfileImage from '../components/account/ProfileImage';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';
import NFTList from '../components/account/NFTList';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import withAuth from '../components/layout/withAuth';

function AccountPage() {
    return (
        <>
            <ProfileImage />
            <NFTList />
        </>
    );
}

export default withAuth(AccountPage);
