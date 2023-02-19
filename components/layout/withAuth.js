import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useAddress } from '@thirdweb-dev/react';

export default function requireAuthentication(gssp) {
    return async context => {
        const { req, res } = context;
        const token = req.cookies.__user_address;
        if (!token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: `/login?referrer=${encodeURIComponent(
                        context.resolvedUrl
                    )}`,
                },
            };
        }

        return await gssp(context);
    };
}
