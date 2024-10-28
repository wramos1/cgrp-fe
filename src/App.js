import './styles/App.css';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import VehicleType from './vehicle-page/vehicle-page-main';
import Login from './login-page/login-page'
import Signup from './login-page/sign-up'
import FindVehicles from './pages/FindVehicles';
import IndividualCarPage from './pages/IndividualCarPage';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/vehicles' element={<VehicleType />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/find-vehicles' element={<FindVehicles />} />
          <Route path='/vehicle/:id' element={<IndividualCarPage />} />
        </Routes >
      </HashRouter >
    </div >
  );
}


export default App;
