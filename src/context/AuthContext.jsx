import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    getToken,
    getUser,
    removeToken,
    removeUser,
    setToken,
    setUser,
} from '../../lib/tokens/token';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
     * Check existing login when application starts
     */
    useEffect(() => {
        const token = getToken();
        const savedUser = getUser();

        if (token && savedUser) {
            setAuthUser(savedUser);
        } else {
            setAuthUser(null);
        }

        setLoading(false);
    }, []);

    /*
     * Login
     */
    const login = (token, userData) => {
        setToken(token);
        setUser(userData);

        setAuthUser(userData);
    };

    /*
     * Logout
     */
    const logout = () => {
        removeToken();
        removeUser();

        setAuthUser(null);
    };

    /*
     * Authentication state
     */
    const isAuthenticated = Boolean(
        getToken() && user
    );

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/*
 * Custom hook
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
};