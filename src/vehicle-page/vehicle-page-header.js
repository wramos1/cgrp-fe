import React from 'react';
import './vehicle-page.css';

const Header = () => {
  return (
    <div className="header">
      <div className="image-container">
        <h1>READY. SET. GO</h1>
        <div className="car-container">
          <img
            src='https://media.discordapp.net/attachments/416069056513179649/1295270631499370526/pngimg.com_-_lamborghini_PNG102907_1.png?ex=670e0a47&is=670cb8c7&hm=d6a7ea9617a71521228ad2f70973569643efe8c86d47274ad75cfc8672389674&=&format=webp&quality=lossless&width=2047&height=885'
            className="lamborghini"
          />
        </div>
        <div className="triangle-up"></div>
      </div>
      <svg width="100%">
        <rect id="box" x="0" y="0" width="100%" height="80" />
      </svg>
    </div>
  );
};

export default Header;