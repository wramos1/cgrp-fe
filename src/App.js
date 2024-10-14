import './styles/App.css';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import VehicleType from './vehicle-page/vehicle-page-main';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/vehicles' element={<VehicleType/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
