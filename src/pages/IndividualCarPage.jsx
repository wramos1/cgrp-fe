import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/IndividualCarPage.css';
import { featuresMap } from '../dataTypes/Features';
import DateRangePicker from '../components/DateRangePicker';
import PaymentForm from '../components/PaymentForm';
import axiosConfig from '../api/axiosConfig'

const IndividualCarPage = () => {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const location = useLocation();
    const vehicle = location.state;


    const displayFeatures = () => {
        return vehicle.vehicleFeatures.map((feat) => {
            return Object.values(featuresMap).map((features, i) => {
                return features.type === feat.featureDescription ? (
                    <div className="feature-display" key={i}>
                        <features.icon width='20px' height='20px' />
                        <span>{feat.featureDescription}</span>
                    </div>
                ) : null;
            })
        })
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // Ensures "YYYY-MM-DD"
    };

    const handleDatesChange = (range) => {
        setDateRange(range);
        console.log('Selected Range:', range);
    };

    const reserveCar = async () => {
        try {
            const payload = {
                customVehicleId: vehicle.customVehicleID,
                startDate: formatDate(dateRange.startDate),
                endDate: formatDate(dateRange.endDate)
            };

            const result = await axiosConfig.post("/reservations/reserve", payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            alert(result.data)
            navigate('/profile');


        } catch (error) {
            alert(error.response.data);
        }
    }

    return (
        <div id='individual-car-page-section'>
            <Link to={"/find-vehicles"} className='back-to-search'> &#8592; Back to Vehicles</Link>
            <div className="car-main-img">
                <img src={vehicle.vehicleImageHostingURL} alt="car hero" />
                <div className="is-rented-sign">
                    <div className={`dot ${vehicle.currentlyRented ? "not-available" : "available"}`}></div>
                    <p className={`rented-label ${vehicle.currentlyRented ? "not-available" : "available"}`}>
                        {vehicle.currentlyRented ? "Not Available" : "Available"}
                    </p>
                </div>
            </div>
            <div className="car-content">

                <div className="car-details">
                    <h2 className="car-title">
                        {vehicle.make + " " + vehicle.model + " " + vehicle.year}
                        <span>{vehicle.color}</span>
                    </h2>
                    <div className='list-of-features'>
                        {displayFeatures()}
                    </div>
                    <div className="description-section">
                        <h3 className="description-title">
                            Description
                        </h3>
                        <p>
                            {vehicle.description}
                        </p>
                    </div>

                </div>

                <div className="reservation-section">
                    <h2 className="price">
                        ${vehicle.dailyRentRate}
                        <span>Daily Rent Price</span>
                    </h2>
                    <DateRangePicker onDatesChange={handleDatesChange} />
                    <PaymentForm />
                    <button className="reserve" onClick={() => reserveCar()}>
                        Reserve
                    </button>
                </div>
            </div>

        </div>
    );
}

export default IndividualCarPage;