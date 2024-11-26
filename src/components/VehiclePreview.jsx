import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PlaceHolderCar from '../images/placeholder-car.png';
import { useInView } from 'react-intersection-observer';

const VehiclePreview = ({ vehicle }) => {

    const { ref, inView } = useInView({
        triggerOnce: true, // Only trigger once when the image enters the viewport
        threshold: 0.1, // 10% of the image should be in view to start loading
    });

    return (
        <div className='vehicle-preview-card'>
            <div className='vehicle-header'>
                <h1 className="impact">{vehicle.year} {vehicle.make} <h1 className='impact' id="up">{vehicle.model}</h1></h1>
            </div>
            <div className='vehicle-img-preview'>
                <img
                    ref={ref}
                    src={inView ? vehicle.vehicleImageHostingURL : PlaceHolderCar}
                    alt={`${vehicle.make} vehicle`}
                    loading="lazy"
                    onError={(e) => e.target.src = PlaceHolderCar}
                />
            </div>
            <div className="vehicle-description">
                <p>${vehicle.dailyRentRate} <p id="day">/day</p></p>
                <Link to={{ pathname: `/vehicle/${vehicle.customVehicleID}` }} state={vehicle.customVehicleID}><button>View Car Details</button></Link>
            </div>
        </div>
    );
}

export default VehiclePreview;