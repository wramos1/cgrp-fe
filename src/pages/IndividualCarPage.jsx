import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/IndividualCarPage.css';
import { featuresMap } from '../dataTypes/Features';
import Star from '../components/Star.jsx';
import DateRangePicker from '../components/DateRangePicker';
import PaymentForm from '../components/PaymentForm';
import axiosConfig from '../api/axiosConfig'
import LeaveReview from '../components/LeaveReview.jsx';
import { toast } from 'react-toastify';

const IndividualCarPage = () => {
    const [apiLoading, setApiLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const [paymentCard, setPaymentCard] = useState({
        cardNumber: "",
        cvv: "",
        expiryMonth: "",
        expiryYear: "",
        nameOnCard: ""
    })

    const navigate = useNavigate();

    const location = useLocation();
    const vehicleID = location.state;


    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setLoading(true);
                await axiosConfig.get(`/home/${vehicleID}`)
                    .then((res) => setVehicle(res.data))
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [vehicleID])



    const displayFeatures = () => {
        return vehicle.vehicleFeatures.map((feat) => {
            return Object.values(featuresMap).map((features, i) => {
                return features.type === feat.featureDescription ? (
                    <div className="feature-display" key={i}>
                        <features.icon width='20px' height='20px' />
                        <span>{feat.featureDescription}</span>
                    </div>
                ) : null;
            })
        })
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // Ensures "YYYY-MM-DD"
    };

    const handleDatesChange = (range) => {
        setDateRange(range);
    };

    const generateExpiryDate = (expiryMonth, expiryYear) => {
        const month = expiryMonth.padStart(2, '0');
        const year = `20${expiryYear}`;
        const day = "30";
        const expiryDate = `${year}-${month}-${day}`;

        return expiryDate;
    };


    const reserveCar = async () => {
        if (paymentCard.cardNumber.trim() === '' || paymentCard.cvv.trim() === '' || paymentCard.expiryYear === '' || paymentCard.expiryMonth === '' || paymentCard.nameOnCard === '') {
            toast.warn('Please input all required fields');
            return;
        }

        try {
            setApiLoading(true);
            const expirationDate = generateExpiryDate(paymentCard.expiryMonth, paymentCard.expiryYear);

            const payload = {
                customVehicleId: vehicle.customVehicleID,
                startDate: formatDate(dateRange.startDate),
                endDate: formatDate(dateRange.endDate),
                userCard: {
                    cardNumber: paymentCard.cardNumber.replace(/\s/g, ''),
                    cvv: Number(paymentCard.cvv),
                    expirationDate,
                    nameOnCard: paymentCard.nameOnCard
                }
            };

            console.log(payload);

            const result = await axiosConfig.post("/reservations/reserve", payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            toast.success(result.data)
            navigate('/profile');

        } catch (error) {
            toast.error(error.response.data);
        }
        finally {
            setApiLoading(false);
        }
    };

    const formatReviewDate = (dateString) => {
        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleDateString('en-US', options);
    };

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const partial = rating % 1;
        const emptyStars = 5 - fullStars - (partial > 0 ? 1 : 0); // Remaining empty stars

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} filled={1} />);
        }
        if (partial > 0) {
            stars.push(<Star key="partial" filled={partial} />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} filled={0} />);
        }

        return stars;
    }


    const displayVehicleReviews = () => {
        if (vehicle.reviewsOfVehicle) {
            return vehicle.reviewsOfVehicle.map((review, i) => {
                return (
                    <div className='review' key={i}>
                        <div className="review-rating">
                            <div className="review-ratings">
                                <p>
                                    {generateStars(review.reviewRating)}
                                </p>
                            </div>

                            <div className="review-date">
                                <p>
                                    {formatReviewDate(review.reviewID.date)}
                                </p>
                            </div>
                        </div>
                        <div className="review-body">
                            <p>
                                "{review.reviewBody}"
                            </p>
                        </div>
                        <h3 className="review-user">
                            - {review.reviewLeaverUsername}
                        </h3>
                    </div>
                )
            })
        }
    }

    return (
        <div id='individual-car-page-section'>
            {
                loading ?
                    <div className="spinner"></div>
                    :

                    <>
                        <Link to={"/find-vehicles"} className='back-to-search'> &#8592; Back to Vehicles</Link><div className="car-main-img">
                            <img src={vehicle.vehicleImageHostingURL} alt="car hero" />
                            <div className="is-rented-sign">
                                <div className={`dot ${vehicle.currentlyRented ? "not-available" : "available"}`}></div>
                                <p className={`rented-label ${vehicle.currentlyRented ? "not-available" : "available"}`}>
                                    {vehicle.currentlyRented ? "Not Available" : "Available"}
                                </p>
                            </div>
                        </div><div className="car-content">

                            <div className="car-details">
                                <h2 className="car-title">
                                    {vehicle.make + " " + vehicle.model + " " + vehicle.year}
                                    <span>{vehicle.color}</span>
                                </h2>
                                <div className='list-of-features'>
                                    {displayFeatures()}
                                </div>
                                <div className="description-section">
                                    <h2 className="description-title">
                                        Description
                                    </h2>
                                    <p>
                                        {vehicle.description}
                                    </p>
                                </div>

                                <h2 className="review-container-title">
                                    Reviews
                                    <span>{vehicle.reviewsOfVehicle.length === 1 ? "1 review" : `${vehicle.reviewsOfVehicle.length} reviews`}</span>
                                </h2>
                                <div className="vehicle-review-container">
                                    {displayVehicleReviews()}
                                </div>

                                <div className="leave-review-container">
                                    <h1 className="leave-review-title">
                                        Leave A Review
                                    </h1>
                                    <LeaveReview customVehicleID={vehicle.customVehicleID} />
                                </div>

                            </div>

                            <div className="reservation-section">
                                <h2 className="price">
                                    ${Number(vehicle.dailyRentRate).toFixed(2)}
                                    <span>Daily Rent Price</span>
                                </h2>
                                <DateRangePicker onDatesChange={handleDatesChange} />
                                <PaymentForm setPaymentCard={setPaymentCard} paymentCard={paymentCard} />
                                <button className="reserve" onClick={() => reserveCar()}>
                                    Reserve
                                </button>
                                {apiLoading ? <div className='loading-call-spinner'></div> : null}
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default IndividualCarPage;