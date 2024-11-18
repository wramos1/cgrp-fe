import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.png';
import SecondaryLogo from '../images/Secondary_Logo.png';

import '../styles/Navbar.css';
import UserDropDownIcon from '../icons/UserDropDownIcon';

const Navbar = () => {

    const [userNavOpened, setUserNavOpened] = useState(false);

    const route = useLocation();
    let isHome = route.pathname === '/';
    const navigate = useNavigate();

    const user = localStorage.getItem('user');

    // useMemo to retrieve and format the username directly from localStorage
    const formattedUser = useMemo(() => {
        if (user) {
            return user.charAt(0).toUpperCase() + user.substring(1).toLowerCase();
        }
        return '';
    }, [user]);

    const logOut = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

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
                            <Link to={'/find-vehicles'} className='nav-link'>
                                SEARCH
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
                    {/* Conditionally render sign-up and login or logout */}
                    {formattedUser !== '' ? (
                        // If logged in, show logout button

                        <div className='logged-in-user'>

                            <p className="user-name" onClick={() => setUserNavOpened(!userNavOpened)}>
                                {user.charAt(0).toUpperCase() + user.substring(1, user.length).toLowerCase()}
                                <UserDropDownIcon style={`${userNavOpened ? 'flipped' : ''}`} />
                            </p>
                            <div className={`dropdown-user-menu ${userNavOpened ? 'open' : ''}`}>
                                <ul>
                                    <li onClick={() => {
                                        setUserNavOpened(!userNavOpened)
                                        navigate("/profile")
                                    }
                                    }>View Profile</li>
                                    <li
                                        className='hover:bg-zinc-300 cursor-pointer flex items-center justify-end p-1 gap-2'
                                        onClick={() => {
                                            setUserNavOpened(!userNavOpened)
                                            logOut()
                                        }}
                                    >
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* If not logged in, show sign-up and login buttons */}
                            <Link to={'/signup'} className="sign-up">SIGN UP</Link>
                            <Link to={'/login'} className="log-in">LOG IN</Link>
                        </>
                    )}
                </div>

            </nav>

        </section>
    );
}

export default Navbar;