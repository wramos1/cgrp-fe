import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../styles/SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/find-vehicles', { state: query });
    };


    return (
        <div className='box'>
            <form className='searchform' onSubmit={handleFormSubmit}>
                <input
                    name='search'
                    type="text"
                    autoComplete='off'
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
