import React, { useEffect, useState } from 'react';
import axiosConfig from '../api/axiosConfig';

import Hero_Car from '../images/porsche.png'
import '../styles/Homepage.css';


const Homepage = () => {
    const [cars, setCars] = useState([]);

    const fetch = async () => {
        const response = await axiosConfig.get("/users/homepage");
        setCars(response.data);
        console.log(response)
    }

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
            </div>

            <button onClick={() => fetch()}>Fetch</button>
            <div>
                {cars ? cars : null}
            </div>

        </div>
    );
}

export default Homepage;