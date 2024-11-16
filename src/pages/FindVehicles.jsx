import React, { useState, useEffect } from 'react'
import axiosConfig from '../api/axiosConfig';
import '../styles/VehicleList.css';
import VehicleList from '../components/VehicleList';
import { useLocation } from 'react-router-dom';

const FindVehicles = () => {
    const location = useLocation();
    const type = location.state

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            const response = await axiosConfig.get("/home/vehicles");
            console.log(response.data);
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchByType = async(vehicleType) => {
        try {
          setVehicles([]); 
          console.log(vehicleType);
          const response = await axiosConfig.get(`/home/keyword/${vehicleType}`);
          setVehicles(response.data);
      } catch (error) {
          console.error("Error fetching vehicles:", error);
      } finally {
          setLoading(false);
      }
      };

    useEffect(() => {
        console.log("Received type:", type);
        if(!type){
            fetchVehicles();
        }
        else{
            searchByType(type);
        }
    }, [type])
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