import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function PleaseWaitModal({ loading, text }) {
    return (
        <div
            className={`fixed inset-0 bg-[#000000cc] flex items-center justify-center transition-opacity ease-in-out duration-200 ${
                loading ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'
            }`}
        >
            <div className="bg-[#262b2f] p-16 w-[500px] flex flex-col items-center rounded-[10px]">
                <h1 className="text-white font-semibold text-3xl pb-6">
                    {text}
                </h1>
                <ClipLoader
                    color="#2081e2"
                    loading={loading}
                    cssOverride={{
                        borderWidth: '3px',
                    }}
                    size={50}
                />
            </div>
        </div>
    );
}

export default PleaseWaitModal;
