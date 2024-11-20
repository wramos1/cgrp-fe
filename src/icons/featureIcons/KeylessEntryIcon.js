import React from 'react';

const KeylessEntryIcon = ({ width = '12px', height = '12px', style }) => {
    return (
        <svg
            className='feature-icon'
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.5 12H6.6C6.26863 12 6 12.2686 6 12.6V19.4C6 19.7314 6.26863 20 6.6 20H17.4C17.7314 20 18 19.7314 18 19.4V18.5"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 12V8C16 6.66667 15.2 4 12 4C11.2532 4 10.6371 4.14525 10.1313 4.38491"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 12H17.4C17.7314 12 18 12.2686 18 12.6V13"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 8V8.5V12"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 3L21 21"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default KeylessEntryIcon;