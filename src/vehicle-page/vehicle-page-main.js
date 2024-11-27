import './vehicle-page.css';
import React from 'react';
import Header from './vehicle-page-header.js';
import Body from './vehicle-page-body.js';
import './vehicle-page.css';


function VehicleType() {
  return (
    <div>
      <Header />
      <div>
        <h1 className='h1-style' id='adjust'>Vehicle Types</h1>
      </div>
      <Body />
    </div>
  );
}

export default VehicleType;