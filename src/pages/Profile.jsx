import { useEffect, useMemo, useState } from "react";
import '../styles/Profile.css';
import axiosConfig from "../api/axiosConfig";
import pfp from "../images/pfp.jpg"
import userpfp from "../images/userpfp.png"
import Star from "../components/Star";

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
    const [review, setReview] = useState([])
    const [reservations, setReservations] = useState(0)
    const [checkin, setCheckinId] = useState(""); // State for the form input

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
            const fetch = await axiosConfig.get('/business/getcurrentmetrics');
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

    const handleCheckinSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const lowercasedCheckin = checkin.toLowerCase(); // Ensure the ID is lowercased
        try {
            const response = await axiosConfig.post(`/reservations/${lowercasedCheckin}`, { customReservationID: lowercasedCheckin }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            fetchReservations();
        } catch (error) {
            console.log(error.response ? error.response.data : "Error checking in vehicle");
        }
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


    useEffect(() => {
        fetchMonthlyRevenue();
        fetchReview();
        fetchReservations();
        setCheckinId("");
    }, [])

    return (
        <div class="profile-page">
            <div class="profile-card">
                <div class="profile-left">
                    <img src={pfp} alt="Profile Picture" class="profile-picture"></img>
                    <h2 class="profile-name">Manager Dashboard</h2>
                    <br></br>
                    <div class="profile-details">
                        <p><strong>Title:</strong> CEO</p>
                        <p><strong>Location:</strong> CSUN</p>
                        <p><strong>Monthly Revenue:</strong><p class="revenue"> ${monthlyRevenue}</p></p>
                        <p><strong>Lifetime Revenue:</strong><p class="revenue"> ${review.totalRentalRevenue}</p></p>
                        <br></br>
                        <form onSubmit={handleCheckinSubmit}>
                            <p><strong>Check Vehicle In:</strong></p>
                            <input
                                type="text"
                                placeholder="Enter ReservationID"
                                value={checkin}
                                onChange={(e) => setCheckinId(e.target.value)}
                                required
                            />
                            <button type="submit" className="cancelbutton">Submit</button>
                        </form>
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
                    <div className="info-card">
                        <h3 className="profile-name">Low-Rated Reviews</h3>
                        {review.lowRatedReviewsToAddress && review.lowRatedReviewsToAddress.length > 0 ? (
                            review.lowRatedReviewsToAddress.map((lowRatedReview) => (
                                <div key={lowRatedReview.customReviewID} className="review-card">
                                    <p><strong>Rating: </strong>
                                        {generateStars(lowRatedReview.reviewRating)}
                                    </p>
                                    <p><strong>Message:</strong> "{lowRatedReview.reviewBody}"</p>
                                    <p><strong>Left By:</strong> {lowRatedReview.reviewLeaverUsername}</p>
                                    <p><strong>Date:</strong> {new Date(lowRatedReview.reviewID.date).toLocaleDateString()}</p>
                                    <br />
                                </div>
                            ))
                        ) : (
                            <p>No low-rated reviews available.</p>
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


    const cancelReservation = async (customReservationID1) => {
        console.log(typeof customReservationID1);
        try {
            const response = await axiosConfig.post(`/reservations/cancel/${customReservationID1}`);
                console.log(response.data);
            fetchReservations();
        } catch (error) {
            console.error(error);
            
        }
    };

    useEffect(() => {
        fetchReview();
        fetchReservations();
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-left">
                    <img src={userpfp} alt="Profile Picture" className="profile-picture"></img>
                    <h2 className="profile-name">User Dashboard</h2>
                    <br></br>
                    <div className="profile-details">
                        <p><strong>Account Created:</strong> November 10th, 2023</p>
                        <p><strong>Location:</strong> CSUN</p>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="info-card">
                        <h3 className="profile-name">Reservations</h3>
                        {reservations.length > 0 ? (
                            reservations.map((reservations) => (
                                <div key={reservations.customReservationID}>
                                    <p><strong>Car: </strong>{reservations.vehicle.make} {reservations.vehicle.model} </p>
                                    <p><strong>Time: </strong> {formatDate(reservations.startDate)} to {formatDate(reservations.endDate)}</p>
                                    <p><strong>Daily Rate: </strong> <p id="revenue">${reservations.chargeAmount}</p></p>
                                    <button onClick={() => cancelReservation(reservations.customReservationID)} className="cancelbutton">
                                    Cancel Reservation
                                    </button>
                                    <br></br><br></br>
                                </div>
                            ))
                        ) : (
                            <p>No reservations.</p>
                        )}
                    </div>
                    <div className="info-card">
                        <h3 className="profile-name">My Reviews</h3>
                        {review.length > 0 ? (
                            review.map((review) => (
                                <div key={review.reviewID}>
                                    <p>
                                        <strong>Rating: </strong>
                                        {generateStars(review.reviewRating)}
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