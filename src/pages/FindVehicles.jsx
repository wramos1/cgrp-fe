import React, { useState, useEffect } from 'react'
import axiosConfig from '../api/axiosConfig';
import '../styles/VehicleList.css';
import VehicleList from '../components/VehicleList';

const FindVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        try {
            const response = await axiosConfig.get("/home/vehicles");
            setVehicles(response.data);
            console.log(response)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    }, [])
    return (
        <div id='vehicle-list-section'>
            {
                loading ?
                    <div className="spinner"></div>
                    :
                    <div className="vehicle-list-container">
                        <VehicleList vehicles={vehicles} />
                    </div>
            }

        </div>
    );
}

export default FindVehicles;