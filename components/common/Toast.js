import { useState, useEffect } from 'react';
import { FcOk, FcHighPriority } from 'react-icons/fc';

function Toast({
    message,
    type = 'success',
    isVisibleToast,
    setIsVisibleToast,
    timeout = 1500,
}) {
    useEffect(() => {
        if (isVisibleToast) {
            const timer = setTimeout(() => {
                setIsVisibleToast(false);
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [isVisibleToast]);

    return (
        <div
            className={`${
                isVisibleToast ? 'ease-out  opacity-100' : 'ease-in  opacity-0'
            } transition-opacity duration-300 fixed bottom-6 right-6 p-4 bg-[#353840] rounded-[10px] text-white font-semibold text-base flex items-center`}
        >
            {type === 'success' ? (
                <FcOk className="text-2xl mr-2" />
            ) : (
                <FcHighPriority className="text-2xl mr-2" />
            )}
            {message}
        </div>
    );
}

export default Toast;
