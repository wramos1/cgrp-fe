import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
    const [user] = useState({ role: 'manager' })
    if (user.role !== role) {
        return <Navigate to={"/unauthorized"} />
    }

    return children;
}

export default ProtectedRoute;