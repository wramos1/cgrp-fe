import React, { useState } from 'react'
import axiosConfig from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/LeaveReview.css';

const LeaveReview = ({ customVehicleID }) => {

    const [loading, setLoading] = useState(false);
    const [reviewRating, setReviewRating] = useState('');
    const [reviewBody, setReviewBody] = useState("");
    const navigate = useNavigate();

    const handleRatingChange = (rating) => {
        const regex = /^(?:[0-4](?:\.\d{0,1})?|5(?:\.0)?)$/;


        if (rating === '' || regex.test(rating)) {
            const numericValue = parseFloat(rating);

            if (numericValue > 5 || numericValue < 0) {
                alert('Value must be between 0.0 and 5.0');
            }
            setReviewRating(rating)
        }
    }

    const leaveReview = async (e) => {
        e.preventDefault();
        if (reviewBody.trim() === '') {
            alert("Review body is required");
            return;
        }

        const payload = {
            reviewRating,
            reviewBody,
            customVehicleID
        };

        try {
            setLoading(true);
            const result = await axiosConfig.post('/review/leavereview', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            alert('Review Left');
            navigate('/profile');

        } catch (error) {
            console.error('Error', error.message)
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <form className='review-form' action="submit">
            <div className="review-form-label-input">
                <label htmlFor="rating-input">Rating</label>
                <input
                    id="rating-input"
                    type="text"
                    value={reviewRating}
                    onChange={(e) => handleRatingChange(e.target.value)}
                    placeholder="Enter rating (0.0 and 5.0)"
                />
            </div>
            <div className="review-form-label-input">
                <label htmlFor="review">Review</label>
                <input className='review-form-body' type="text" name='review' maxLength={200} />
            </div>
        </form>
    );
}

export default LeaveReview;