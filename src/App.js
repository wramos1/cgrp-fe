import './styles/App.css';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import VehicleType from './vehicle-page/vehicle-page-main';
import IndividualCarPage from './pages/IndividualCarPage';
import VehicleList from './components/VehicleList';
import FindVehicles from './pages/FindVehicles';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/vehicles' element={<VehicleType />} />
          <Route path='/find-vehicles' element={<FindVehicles />} />
          <Route path='/vehicle/:id' element={<IndividualCarPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
