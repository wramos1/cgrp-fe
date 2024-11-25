import { useEffect, useMemo, useState } from "react";
import '../styles/Profile.css';
import axiosConfig from "../api/axiosConfig";
import pfp from "../images/pfp.jpg"
import userpfp from "../images/userpfp.png"

const Profile = () => {
    const [isManager, setIsManager] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const user = localStorage.getItem('user')
    const formattedUser = useMemo(() => {
        if (user) {
            return user.charAt(0).toUpperCase() + user.substring(1).toLowerCase();
        }
        return '';
    }, [user]);

    const verifyAuth = () => {
        try {
            const auth = localStorage.getItem('auth');
            if (auth === "ADMIN") {
                setIsManager(true)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyAuth()
    }, [])

    return (
        <div className="profile-section">
            {
                isLoading ?
                    <div className="spinner"></div>
                    :
                    (
                        <div>
                            <h1 className="h1header">
                                Welcome, {formattedUser}
                            </h1>
                            {isManager ? <ManagerView /> : <UserView />}
                        </div>
                    )

            }
        </div>
    )
}

const ManagerView = () => {
    const [monthlyRevenue, setMonthlyRevenue] = useState(0)
    const [review, setReview] = useState(0)
    const [reservations, setReservations] = useState(0)

    const fetchMonthlyRevenue = async () => {
        try {
            const fetch = await axiosConfig.get('/admin/monthly-revenue');
            setMonthlyRevenue(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReview = async () => {
        try {
            const fetch = await axiosConfig.get('/review/getMyReviews');
            setReview(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };
    const fetchReservations = async () => {
        try {
            const fetch = await axiosConfig.get('/reservations/reserve');
            setReservations(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchMonthlyRevenue();
        fetchReview();
        fetchReservations();
    }, [])

    return (
        <div class="profile-page">
            <div class="profile-card">
                <div class="profile-left">
                    <img src={pfp} alt="Profile Picture" class="profile-picture"></img>
                    <h2 class="profile-name">Manager Dashboard</h2>
                    <p class="profile-role">Here are your management tools and insights.</p>
                    <div class="profile-details">
                        <p><strong>Title:</strong> CEO</p>
                        <p><strong>Location:</strong> CSUN</p>
                        <p><strong>Monthly Revenue:</strong><p class="revenue"> ${monthlyRevenue}</p></p>
                    </div>
                </div>
                <div class="profile-right">
                    <div class="info-card">
                        <h3 class="profile-name">All Cars Currently Reserved</h3>
                        {reservations.length > 0 ? (
                    reservations.map((reservations) => (
                        <div key={reservations.customReservationID}>
                            <p><strong>Car: </strong>{reservations.vehicle.make} {reservations.vehicle.model} </p>
                            <p><strong>Time: </strong> {reservations.startDate} to {reservations.endDate}</p>
                            <p><strong>Daily Rate: </strong> <p id="revenue">${reservations.chargeAmount}</p></p>
                            <br></br>
                        </div>
                    ))
                ) : (
                    <p>No reservations.</p>
                )}
                    </div>
                    <div class="info-card">
                        <h3 class="profile-name">All Current Reviews</h3>
                        {review.length > 0 ? (
                            review.map((review) => (
                                <div key={review.reviewID}>
                                    <p>
                                        <strong>Rating: </strong> 
                                        {[...Array(review.reviewRating)].map((_, index) => (
                                            <span key={index} id="star">&#9733;</span> // Unicode for filled star
                                        ))}
                                        {[...Array(5 - review.reviewRating)].map((_, index) => (
                                            <span key={index} id="star">&#9734;</span> // Unicode for empty star
                                        ))}
                                    </p>
                                    <p><strong>Message:</strong> "{review.reviewBody}"</p>
                                    <br></br>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>

    );
};

const UserView = () => {
    const [review, setReview] = useState(0)
    const [reservations, setReservations] = useState(0)

    const fetchReview = async () => {
        try {
            const fetch = await axiosConfig.get('/review/getMyReviews');
            setReview(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };
    const fetchReservations = async () => {
        try {
            const fetch = await axiosConfig.get('/reservations/myReservations');
            setReservations(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReview();
        fetchReservations();
    }, [])

    return (
    <div class="profile-page">
    <div class="profile-card">
        <div class="profile-left">
            <img src={userpfp} alt="Profile Picture" class="profile-picture"></img>
            <h2 class="profile-name">User Dashboard</h2>
            <br></br>
            <div class="profile-details">
                <p><strong>Account Created:</strong> November 10th, 2023</p>
                <p><strong>Location:</strong> CSUN</p>
            </div>
        </div>
        <div class="profile-right">
            <div class="info-card">
                <h3 class="profile-name">Reservations</h3>
                {reservations.length > 0 ? (
                    reservations.map((reservations) => (
                        <div key={reservations.customReservationID}>
                            <p><strong>Car: </strong>{reservations.vehicle.make} {reservations.vehicle.model} </p>
                            <p><strong>Time: </strong> {reservations.startDate} to {reservations.endDate}</p>
                            <p><strong>Daily Rate: </strong> <p id="revenue">${reservations.chargeAmount}</p></p>
                            <br></br>
                        </div>
                    ))
                ) : (
                    <p>No reservations.</p>
                )}
            </div>
            <div class="info-card">
                <h3 class="profile-name">My Reviews</h3>
                {review.length > 0 ? (
                    review.map((review) => (
                        <div key={review.reviewID}>
                            <p>
                                <strong>Rating: </strong> 
                                {[...Array(review.reviewRating)].map((_, index) => (
                                    <span key={index} id="star">&#9733;</span> // Unicode for filled star
                                ))}
                                {[...Array(5 - review.reviewRating)].map((_, index) => (
                                    <span key={index} id="star">&#9734;</span> // Unicode for empty star
                                ))}
                            </p>
                            <p><strong>Message:</strong> "{review.reviewBody}"</p>
                            <br></br>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    </div>
</div>
);
};

export default Profile;