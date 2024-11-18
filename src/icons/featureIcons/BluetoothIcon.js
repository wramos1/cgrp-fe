import React from 'react';

const BluetoothIcon = ({ width = '12px', height = '12px', style }) => {
    return (
        <svg
            className='feature-icon'
            width={width}
            height={height}
            viewBox="0 0 204.721 204.721"
        >
            <g>
                <g>
                    <path
                        style={{ fill: '#010002' }}
                        d="M156.423,52.555L98.903,0v94.65v1.854L52.951,50.555l-4.656,4.656l49.159,49.159l-45.87,42.66
                        l4.484,4.835l42.835-39.843v92.699l57.523-57.516l-49.46-45.194L156.423,52.555z M105.496,14.949l41.389,37.821l-41.389,41.393
                        V14.949z M105.496,188.813v-79.214l41.389,37.825L105.496,188.813z"
                    />
                </g>
            </g>
        </svg>
    );
};

export default BluetoothIcon;