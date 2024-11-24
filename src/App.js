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
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route
              path='/vehicles'
              element={<ProtectedRoute> <VehicleType /> </ProtectedRoute>}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/find-vehicles'
              element={<ProtectedRoute>
                <FindVehicles />
              </ProtectedRoute>} />
            <Route path='/vehicle/:id' element={<IndividualCarPage />} />
            <Route path='/profile' element={<Profile />} />
          </Routes >
        </ScrollToTop>
      </HashRouter >
    </div >
  );
}


export default App;
