import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const {
        user,
        loading,
        isAuthenticated,
    } = useAuth();

    /*
     * Wait until authentication is checked
     */
    if (loading) {
        return null;
    }

    /*
     * User is not logged in
     */
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    /*
     * User does not have permission
     */
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/" replace />;
    }

    /*
     * User is authenticated and authorized
     */
    return children;
};

export default ProtectedRoute;