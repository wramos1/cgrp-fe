import React, { useState } from 'react'
import { Makes } from '../dataTypes/Makes';
import { Types } from '../dataTypes/Types';
import '../styles/Filters.css';
import UserDropDownIcon from '../icons/UserDropDownIcon';

const Filters = ({ searchAllFilters }) => {
    const [makeFilters, setMakeFilters] = useState([]);
    const [typeFilters, setTypeFilters] = useState([]);
    const [keyword, setKeyword] = useState('');

    const queriesShow = (e) => {
        const previousSelects = document.querySelectorAll('.active');
        const targetElement = e.currentTarget.nextElementSibling;
        if (previousSelects.length > 0) {
            if (targetElement.classList === previousSelects[0].classList) {
                targetElement.classList.toggle("hidden");
            } else {
                previousSelects[0].classList.add('hidden');
                previousSelects[0].classList.remove('active');
                targetElement.classList.toggle("hidden");
                targetElement.classList.add("active");
            }
        }
        else {
            targetElement.classList.toggle("hidden");
            targetElement.classList.add("active");
        }
    };

    const updateMakeFilters = (make, checked) => {
        if (checked) {
            setMakeFilters([...makeFilters, make]);
        }
        else {
            let newMakeFilters = makeFilters.filter((filter) => filter !== make);
            setMakeFilters(newMakeFilters);
        }
    };

    const updateTypeFilters = (type, checked) => {
        if (checked) {
            setTypeFilters([...typeFilters, type]);
        }
        else {
            let newTypeFilters = typeFilters.filter((filter) => filter !== type);
            setTypeFilters(newTypeFilters);
        }
    }

    const constructMakeDropdown = () => {
        return Object.entries(Makes).map((make, i) => {
            return (
                <div className='checkbox-for-filter' key={i}>
                    <input type="checkbox" id={make[1]} name={make[1]} onChange={(e) => updateMakeFilters(make[1], e.target.checked)} />
                    <label htmlFor={make[1]}>{make[0]}</label>
                </div>
            )
        })
    };

    const constructTypeDropdown = () => {
        return Object.entries(Types).map((type, i) => {
            return (
                <div className="checkbox-for-filter" key={i}>
                    <input type="checkbox" id={type[1]} name={type[1]} onChange={(e) => updateTypeFilters(type[1], e.target.checked)} />
                    <label htmlFor={type[1]}>{type[0]}</label>
                </div>
            )
        })
    };

    const searchWithFilters = () => {
        let keywords = keyword.toLowerCase().split(' ');
        let filterArr = [keywords, makeFilters, typeFilters].flat();
        let uniqueArr = [...new Set(filterArr)].join(' ')
        searchAllFilters(uniqueArr);
    };



    return (
        <div className='filters-section'>
            <h3 className='filters-title'>
                Filters
            </h3>
            <div className="filters">
                <div className="filters-list">
                    <div className="filter-by-keyword">
                        <input
                            autoComplete='off'
                            name='search'
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search By Keyword"
                            className="search-input"
                        />
                    </div>
                    <div className='dropdown'>
                        <h1 className="dropdown-title" onClick={(e) => queriesShow(e)}>
                            Select Make ({makeFilters.length})
                            <UserDropDownIcon />
                        </h1>
                        <div className="pop-up-dropdown hidden">
                            {constructMakeDropdown()}
                        </div>
                    </div>
                    <div className='dropdown'>
                        <h1 className="dropdown-title" onClick={(e) => queriesShow(e)}>
                            Select Type ({typeFilters.length})
                            <UserDropDownIcon />
                        </h1>
                        <div className="pop-up-dropdown hidden">
                            {constructTypeDropdown()}
                        </div>
                    </div>
                    <button className="search-all-filters-button" onClick={() => searchWithFilters()}>
                        Search
                    </button>

                </div>
            </div>

        </div>
    );
}

export default Filters;