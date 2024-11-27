import React from 'react';
import './vehicle-page.css';
import lambo from '../images/lambo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="image-container">
        <br></br><br></br><br></br><br></br><br></br>
        <h1 className='h1-style'>READY. SET. GO</h1>
        <div className="car-container">
          <img
            src={lambo}
            alt='hero of lamborghini'
            className="lamborghini"
          />
        </div>
        <div className="triangle-up"></div>
      </div>
      <svg width="100%">
        <rect id="box" x="0" y="0" width="100%" height="80" />
      </svg>
    </div>
  );
};

export default Header;