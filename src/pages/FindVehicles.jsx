import React, { useState, useEffect, useRef } from 'react'
import axiosConfig from '../api/axiosConfig';
import '../styles/VehicleList.css';
import VehicleList from '../components/VehicleList';
import { useLocation } from 'react-router-dom';
import Filters from '../components/Filters';

const FindVehicles = () => {
    const initialLoad = useRef(false)

    const location = useLocation();
    const type = location.state

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllVehicles = async () => {
        try {
            const response = await axiosConfig.get("/home/vehicles");
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchVehicles = async (searchParam) => {
        console.log(searchParam);

        try {
            const response = await axiosConfig.get(`/home/keyword/${searchParam}`);
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!initialLoad.current) {
            initialLoad.current = true;
            if (type) {
                searchVehicles(type);
            } else {
                fetchAllVehicles();
            }
        } else if (type) {
            searchVehicles(type);
        }
    }, [type])
    return (
        <div id='vehicle-list-section'>
            <Filters searchAllFilters={(e) => searchVehicles(e)} />
            {
                loading ?
                    <div className="spinner"></div>
                    :
                    <div className="vehicle-list-container">
                        <p className='vehicle-list-results'>
                            {vehicles.length === 1 ? `${vehicles.length} result` : `${vehicles.length} results`}
                        </p>
                        <VehicleList vehicles={vehicles} />
                    </div>
            }

        </div>
    );
}

export default FindVehicles;