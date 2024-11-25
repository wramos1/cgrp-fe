import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if user not found
    }
    return children;
}

export default ProtectedRoute;