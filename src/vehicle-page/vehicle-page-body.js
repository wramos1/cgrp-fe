import React from 'react';
import './vehicle-page.css';
import truck from '../images/truck.png';
import SUV from '../images/SUV.png';
import sedan from '../images/sedan.png';
import coupe from '../images/coupe.png';
import luxury from '../images/luxury.png';
import classic from '../images/classic.png';


const Body = () => {
  return (
    <div className="card-container">
      <div className="card-box">
        <img src={truck} alt="Truck" />
        <h2>Truck</h2>
        <button>View Now</button>
      </div>
      <div className="card-box">
        <img src={SUV} alt="Truck" />
        <h2>SUV</h2>
        <button>View Now</button>
      </div>
      <div className="card-box">
        <img src={sedan} alt="Truck" />
        <h2>Sedan</h2>
        <button>View Now</button>
      </div>
      <div className="card-box">
        <img src={coupe} alt="Truck" />
        <h2>Coupe</h2>
        <button>View Now</button>
      </div>
      <div className="card-box">
        <img src={luxury} alt="Truck" />
        <h2>Luxury</h2>
        <button>View Now</button>
      </div>
      <div className="card-box">
        <img src={classic} alt="Truck" />
        <h2>Classic</h2>
        <button>View Now</button>
      </div>
    </div>
  );
};

export default Body;