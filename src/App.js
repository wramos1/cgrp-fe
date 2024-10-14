import './styles/App.css';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
