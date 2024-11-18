import React, { useEffect, useState } from 'react';
import axiosConfig from '../api/axiosConfig';

import Hero_Car from '../images/porsche.png'
import '../styles/Homepage.css';


const Homepage = () => {

    return (
        <div id='home'>

            <div className="hero">
                <div className="call-to-action">
                    <h1>READY.</h1>
                    <h1>SET.</h1>
                    <h1>GO.</h1>
                </div>
                <div className='hero-car-img-container'>
                    <img src={Hero_Car} alt="hero image of car" />
                </div>
            </div >

        </div >
    );
}

export default Homepage;