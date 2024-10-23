import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const VehiclePreview = ({ vehicle }) => {
    return (
        <div className='vehicle-preview-card'>
            <div className='vehicle-header'>
                <h1>{vehicle.year} {vehicle.make}</h1>
            </div>
            <div className='vehicle-img-preview'>
                <img src="https://pngimg.com/d/mercedes_PNG1879.png" alt="" />
            </div>
            <div className="vehicle-description">
                <p>This car is cool</p>
                <Link to={{ pathname: `/vehicle/${vehicle.make}` }} state={vehicle}>View Car Details</Link>
            </div>
        </div>
    );
}

export default VehiclePreview;