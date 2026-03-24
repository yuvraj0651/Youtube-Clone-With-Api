import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const ProtectedRoutes = ({ children, allowedRole }) => {

    const { authData, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    };

    if (!allowedRole.includes(authData.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export default ProtectedRoutes