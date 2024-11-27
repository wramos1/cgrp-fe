import React from 'react'
import { Link } from 'react-router-dom';
import PlaceHolderCar from '../images/placeholder-car.png';
import { useInView } from 'react-intersection-observer';

const VehiclePreview = ({ vehicle }) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className='vehicle-preview-card'>
            <div className='vehicle-header'>
                <h1 className="impact">{vehicle.year} {vehicle.make} <span className='impact' id="up">{vehicle.model}</span></h1>
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
                <p>${Number(vehicle.dailyRentRate).toFixed(2)} <span id="day">/day</span></p>
                <Link to={{ pathname: `/vehicle/${vehicle.customVehicleID}` }} state={vehicle.customVehicleID}><button>View Car Details</button></Link>
            </div>
        </div>
    );
}

export default VehiclePreview;