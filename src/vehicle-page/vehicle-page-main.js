import './vehicle-page.css';
import React from 'react';
import Header from './vehicle-page-header.js';
import Body from './vehicle-page-body.js';
import './vehicle-page.css';


function VehicleType() {
  return (
    <div>
      <Header />
      <h1 className='h1-style'>Vehicle Types</h1>
      <Body />
    </div>
  );
}

export default VehicleType;