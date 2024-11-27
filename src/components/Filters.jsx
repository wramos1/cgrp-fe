import React, { useState } from 'react'
import { Makes } from '../dataTypes/Makes';
import { Types } from '../dataTypes/Types';
import '../styles/Filters.css';
import UserDropDownIcon from '../icons/UserDropDownIcon';

const Filters = ({ searchAllFilters }) => {
    const [makeFilters, setMakeFilters] = useState([]);
    const [typeFilters, setTypeFilters] = useState([]);
    const [keyword, setKeyword] = useState('');

    const resetFiltering = () => {
        const checkboxes = document.querySelectorAll('.checkbox-for-filter input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        setMakeFilters([]);
        setTypeFilters([]);
        setKeyword('');
        searchAllFilters();
    }

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

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const searchWithFilters = (e) => {
        e.preventDefault();
        let keywords = keyword.toLowerCase().split(' ');
        const filtersMap = {};
        const checkboxes = document.querySelectorAll('.checkbox-for-filter input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked === true) {
                filtersMap[checkbox.id] = 1;
            }
        });

        if (isEmpty(filtersMap) === false) {
            keywords = keywords.filter((word) => filtersMap[word] !== 1);
        }
        let filterObj = {
            makes: makeFilters,
            types: typeFilters,
            keywords
        };
        searchAllFilters(filterObj);
    };



    return (
        <React.Fragment>
            <div className='filters-section'>
                <h3 className='filters-title'>
                    Filter by:
                </h3>
                <form action='submit' className="filters" onSubmit={(e) => searchWithFilters(e)}>
                    <div className="filters-list">
                        <div className="filter-by-keyword">
                            <label htmlFor="">Keyword</label>
                            <input
                                autoComplete='off'
                                name='search'
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search..."
                                className="keyword-search"
                            />
                        </div>
                        <div className='dropdown'>
                            <label htmlFor="">Make</label>
                            <h1 className="dropdown-title" onClick={(e) => queriesShow(e)}>
                                Select ({makeFilters.length})
                                <UserDropDownIcon />
                            </h1>
                            <div className="pop-up-dropdown hidden">
                                {constructMakeDropdown()}
                            </div>
                        </div>
                        <div className='dropdown'>
                            <label htmlFor="">Type</label>
                            <h1 className="dropdown-title" onClick={(e) => queriesShow(e)}>
                                Select ({typeFilters.length})
                                <UserDropDownIcon />
                            </h1>
                            <div className="pop-up-dropdown hidden">
                                {constructTypeDropdown()}
                            </div>
                        </div>
                    </div>
                    <button className="search-all-filters-button">
                        Search
                    </button>
                </form>

            </div>

            {(makeFilters.length || typeFilters.length || keyword.length) ?
                (<p
                    className='reset-filters'
                    onClick={() => resetFiltering()}
                >
                    Reset Filters
                    <span>
                        &#x27F2;
                    </span>
                </p>) : null}
        </React.Fragment>
    );
}

export default Filters;