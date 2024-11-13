import React from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/IndividualCarPage.css';

const IndividualCarPage = () => {
    const location = useLocation();
    const vehicle = location.state
    return (
        <div id='individual-car-page-section'>
            <div className="car-main-img">
                <img src={vehicle.vehicleImageHostingURL} alt="car hero" />
            </div>
            <div className="car-content">
                <h2 className="car-title">
                    {vehicle.make + " " + vehicle.model + " " + vehicle.year}
                    <span>{vehicle.color}</span>
                </h2>
            </div>
            {/* {vehicle.make}
            <div className='vehicle-img-preview'>
                <img src={vehicle.vehicleImageHostingURL} alt="" />
            </div> */}
        </div>
    );
}

export default IndividualCarPage;