import React from 'react';

import Hero_Car from '../images/porsche.png'
import '../styles/Homepage.css';
import SearchBar from '../components/SearchBar';


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
            </div>
            <SearchBar />
        </div>
    );
}

export default Homepage;