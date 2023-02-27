import Link from 'next/link';
import React from 'react';
import requireAuthentication from '../../components/layout/withAuth';

function Collectionpage() {
    return (
        <div className="w-[1280px] max-w-full p-6 mx-auto z-[15] h-[100vh]">
            <h1 className="font-semibold text-white text-[40px] mt-8 mb-4">
                My Collections
            </h1>
            <div className="mb-4">
                <div className="text-white text-base mt-4 mb-10">
                    Create, curate, and manage collections of unique NFTs to
                    share and sell.
                </div>
                <Link href="/collections/create" className="">
                    <a className="bg-[#2081e2] hover:bg-[#2e8eee] text-white text-base font-semibold rounded-xl px-6 py-[18px] ">
                        Create a collection
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Collectionpage;

export const getServerSideProps = requireAuthentication(async context => {
    return {
        props: {},
    };
});
