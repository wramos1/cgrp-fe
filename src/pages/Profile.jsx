import { useEffect, useMemo, useState } from "react";
import '../styles/Profile.css';
import axiosConfig from "../api/axiosConfig";

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
                            <h1>
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
            console.log(fetch)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchMonthlyRevenue();
    }, [])

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <p>Here are your management tools and insights.</p>
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