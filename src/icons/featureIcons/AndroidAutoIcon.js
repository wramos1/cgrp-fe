import React from 'react';

const AndroidAutoIcon = ({ width = '12px', height = '12px', style }) => {
    return (
        <svg
            className='feature-icon'
            width={width}
            height={height}
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <path
                stroke="#000000"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M56 146H26.074c-3.111 0-5.031-3.396-3.427-6.062l69.925-116.24c1.555-2.584 5.301-2.584 6.856 0l69.925 116.24c1.604 2.666-.316 6.062-3.427 6.062H136"
            />
            <path
                stroke="#000000"
                strokeLinejoin="round"
                strokeWidth="12"
                d="m42 170 54-92 54 92-54-24-54 24Z"
            />
        </svg>
    );
};

export default AndroidAutoIcon;