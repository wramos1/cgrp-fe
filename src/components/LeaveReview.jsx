import React, { useState } from 'react'
import axiosConfig from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/LeaveReview.css';
import { toast } from 'react-toastify';

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
                toast.error('Value must be between 0.0 and 5.0');
            }
            setReviewRating(rating)
        }
    }

    const leaveReview = async (e) => {
        e.preventDefault();
        if (reviewBody.trim() === '') {
            toast.error("Review body is required");
            return;
        }

        const payload = {
            reviewRating: Number(reviewRating),
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
            setReviewBody('')
            setReviewRating('')
            toast.success('Thank you for leaving us a review!');
            navigate('/profile');

        } catch (error) {
            console.error('Error', error.message)
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <form className='review-form' action="submit" onSubmit={(e) => leaveReview(e)}>
            <div className="review-form-label-input">
                <label htmlFor="rating">Rating</label>
                <input
                    className='rating-input'
                    name='rating'
                    type="number"
                    value={reviewRating}
                    onChange={(e) => handleRatingChange(e.target.value)}
                    placeholder="0.0"
                    required
                    step={`${reviewRating % 1 === 0 ? '1' : '0.1'}`}
                    onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
            <div className="review-form-label-input">
                <label htmlFor="review">Review</label>
                <textarea
                    required
                    className='review-form-body'
                    type="text"
                    name='review'
                    maxLength={120}
                    draggable="false"
                    placeholder='Please share your experience with us'
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                />
            </div>
            <button className="submit-review">
                Submit Review
            </button>
        </form>
    );
}

export default LeaveReview;