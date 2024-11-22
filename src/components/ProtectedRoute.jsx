import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    console.log(user)

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if user not found
    }
    return children;
}

export default ProtectedRoute;