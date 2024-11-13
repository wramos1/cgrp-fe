import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vehicle-page.css';
import truck from '../images/truck.png';
import SUV from '../images/SUV.png';
import sedan from '../images/sedan.png';
import coupe from '../images/coupe.png';
import luxury from '../images/luxury.png';
import classic from '../images/classic.png';
import VehicleList from '../components/VehicleList';
import axiosConfig from '../api/axiosConfig';


const Body = ({}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchByType = async(vehicleType) => {
    try {
      const response = await axiosConfig.get(`/home/typeSearch/${vehicleType}`);
      setVehicles(response.data);
  } catch (error) {
      console.error("Error fetching vehicles:", error);
  } finally {
      setLoading(false);
  }
  };

  return (
    <div>
      <div className="card-container">
        <div className="card-box">
          <img src={truck} alt="Truck" />
          <h2>Truck</h2>
          <button onClick={() => searchByType('Truck')}>View Now</button>
        </div>
        <div className="card-box">
          <img src={SUV} alt="SUV" />
          <h2>SUV</h2>
          <button onClick={() => searchByType('SUV')}>View Now</button>
        </div>
        <div className="card-box">
          <img src={sedan} alt="Sedan" />
          <h2>Sedan</h2>
          <button onClick={() => searchByType('Sedan')}>View Now</button>
        </div>
        <div className="card-box">
          <img src={coupe} alt="Coupe" />
          <h2>Coupe</h2>
          <button onClick={() => searchByType('Coupe')}>View Now</button>
        </div>
        <div className="card-box">
          <img src={luxury} alt="Luxury" />
          <h2>Luxury</h2>
          <button onClick={() => searchByType('Luxury')}>View Now</button>
        </div>
        <div className="card-box">
          <img src={classic} alt="Classic" />
          <h2>Classic</h2>
          <button onClick={() => searchByType('Classic')}>View Now</button>
        </div>
      </div>
    </div>
  );
};

export default Body;
