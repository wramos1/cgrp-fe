import React from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/IndividualCarPage.css';

const IndividualCarPage = () => {
    const location = useLocation();
    const vehicle = location.state
    return (
        <div id='individual-car-page-section'>
            {vehicle.make}
        </div>
    );
}

export default IndividualCarPage;