import React, { useState, useEffect } from 'react'
import axiosConfig from '../api/axiosConfig';
import '../styles/FindVehicles.css';
import VehicleList from '../components/VehicleList';
import { useLocation } from 'react-router-dom';
import Filters from '../components/Filters';

const FindVehicles = () => {
    const location = useLocation();
    const type = location.state

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllVehicles = async () => {
        try {
            setLoading(true)
            const response = await axiosConfig.get("/home/vehicles");
            setVehicles(response.data);
            sessionStorage.setItem("cachedVehicles", JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
            sessionStorage.setItem("initialLoadComplete", "true");
        }
    };

    const searchVehicles = async (searchParams) => {
        if (searchParams) {
            try {
                setLoading(true);
                const response = await axiosConfig.post('/home/keyword', searchParams, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setVehicles(response.data);
                sessionStorage.setItem("cachedVehicles", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            } finally {
                setLoading(false);
            }
        }
        else {
            fetchAllVehicles();
        }
    };

    useEffect(() => {
        const initialLoadComplete = sessionStorage.getItem("initialLoadComplete") === "true";
        const cachedVehicles = sessionStorage.getItem("cachedVehicles");

        if (cachedVehicles && initialLoadComplete && !type) {
            setVehicles(JSON.parse(cachedVehicles));
            setLoading(false);
        } else if (type) {
            searchVehicles({
                makes: [],
                types: [type],
                keywords: []
            });
        } else {
            fetchAllVehicles();
        }
    }, [])

    return (
        <div id='vehicle-list-section'>
            <Filters
                searchAllFilters={(e) => searchVehicles(e)}
            />
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