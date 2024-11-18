import React from 'react';

const UserDropDownIcon = ({ width = '12px', height = '12px', style }) => {
    return (
        <svg
            className={`user-drop-down-icon ${style}`}
            width={width}
            height={height}
            viewBox="0 0 6 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="Polygon 1"
                d="M3 3L0.401924 0.75L5.59808 0.75L3 3Z"
                fill="black"
            />
        </svg>
    );
};

export default UserDropDownIcon;
