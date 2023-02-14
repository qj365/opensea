import React from 'react';
import ProfileImage from '../../components/account/ProfileImage';
import OnlyHeaderLayout from '../../components/layout/OnlyHeaderLayout';
import NFTList from '../../components/account/NFTList';
function AccountPage() {
    return (
        <>
            <ProfileImage />
            <NFTList />
        </>
    );
}

export default AccountPage;
