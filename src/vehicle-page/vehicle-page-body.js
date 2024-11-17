import React from 'react';
import { Link } from 'react-router-dom';
import './vehicle-page.css';
import truck from '../images/truck.png';
import SUV from '../images/SUV.png';
import sedan from '../images/sedan.png';
import coupe from '../images/coupe.png';
import luxury from '../images/luxury.png';
import classic from '../images/classic.png';
import SearchBar from '../components/SearchBar';


const Body = ({}) => {

  return (
    <div>
      <SearchBar/>
      <div className="card-container">
        <div className="card-box">
          <img src={truck} alt="Truck" />
          <h2>Truck</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'truck'}><button>View Now</button></Link>
        </div>
        <div className="card-box">
          <img src={SUV} alt="SUV" />
          <h2>SUV</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'SUV'}><button>View Now</button></Link>
        </div>
        <div className="card-box">
          <img src={sedan} alt="Sedan" />
          <h2>Sedan</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'sedan'}><button>View Now</button></Link>
        </div>
        <div className="card-box">
          <img src={coupe} alt="Coupe" />
          <h2>Coupe</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'coupe'}><button>View Now</button></Link>
        </div>
        <div className="card-box">
          <img src={luxury} alt="Luxury" />
          <h2>Luxury</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'luxury'}><button>View Now</button></Link>
        </div>
        <div className="card-box">
          <img src={classic} alt="Classic" />
          <h2>Classic</h2>
          <Link to={{ pathname: `/find-vehicles` }} state={'classic'}><button>View Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
