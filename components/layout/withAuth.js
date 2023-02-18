import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useAddress } from '@thirdweb-dev/react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

function withAuth(WrappedComponent) {
    function WithAuth(props) {
        const router = useRouter();
        const address = useAddress();

        useDidMountEffect(() => {
            // react please run me if 'key' changes, but not on initial render
            if (typeof address === 'undefined') {
                router.push('/login');
            }
            console.log('to login');
        }, []);

        useEffect(() => {
            console.log(address);
        }, [address]);

        return <WrappedComponent {...props} />;
    }

    WithAuth.displayName = `withAuth(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;
    return WithAuth;
}

export default withAuth;
