import { useEffect, useMemo, useState } from "react";
import '../styles/Profile.css';
import axiosConfig from "../api/axiosConfig";
import pfp from "../images/pfp.jpg"

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

    const fetchMonthlyRevenue = async () => {
        try {
            const fetch = await axiosConfig.get('/admin/monthly-revenue');
            setMonthlyRevenue(fetch.data)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchMonthlyRevenue();
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
                    </div>
                </div>
                <div class="profile-right">
                    <div class="info-card">
                        <h3>Monthly Revenue</h3>
                        <p class="revenue">${monthlyRevenue}<p id="increase">+24.7% increase</p></p>
                        
                    </div>
                    <div class="info-card">
                        <h3>Goals</h3>
                        <p>Optimize team performance and improve customer satisfaction.</p>
                    </div>
                    <div class="info-card">
                        <h3>Motivations</h3>
                        <p>Achieving company objectives and fostering innovation.</p>
                    </div>
                    <div class="info-card">
                        <h3>Concerns</h3>
                        <p>Managing workload and adapting to market changes.</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

const UserView = () => (
    <div>
        <h2>User Profile</h2>
        <p>Here are your personal details and activities.</p>
    </div>
);

export default Profile;