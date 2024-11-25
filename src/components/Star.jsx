import React from 'react';
import '../styles/Star.css'; // Assume this contains relevant CSS

function Star({ filled }) {
    return (
        <span className="star">
            <span
                className="star-fill"
                style={{ width: `${filled * 100}%` }} // Width corresponds to the fraction (e.g., 50% for half star)
            >
                ★
            </span>
            <span className="star-empty">★</span>
        </span>
    );
};

export default Star;
