import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../images/Logo.png';
import SecondaryLogo from '../images/Secondary_Logo.png';

import '../styles/Navbar.css';

const Navbar = () => {

    const route = useLocation();
    let isHome = route.pathname === '/';

    return (
        <section className={`navbar-container ${isHome ? '' : 'not-home-nav'}`}>
            <nav className='navbar'>
                <div className="logo-container">
                    <Link to={"/"}>
                        <img
                            className='logo'
                            src={isHome ? Logo : SecondaryLogo}
                            alt="logo"
                        />
                    </Link>
                </div>

                <div className='nav-menu'>
                    <ul className="nav-list">
                        <li className={`nav-item ${isHome ? '' : 'not-home-nav'}`}>
                            <Link to={'/'} className='nav-link'>
                                HOME
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={'/vehicles'} className='nav-link'>
                                VEHICLES
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={'/contact'} className='nav-link'>
                                ABOUT US
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sign-in-btns">
                    <Link to={'/signup'} className="sign-up">SIGN UP</Link>
                    <Link to={'/login'} className="log-in">LOG IN</Link>
                </div>

            </nav>

        </section>
    );
}

export default Navbar;