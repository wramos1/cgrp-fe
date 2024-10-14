import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import VehicleType from './vehicle-page/vehicle-page-main.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <VehicleType />
  </React.StrictMode>
);

