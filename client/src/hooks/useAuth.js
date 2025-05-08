import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Check for stored user data when component mounts
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Clear any existing alert timeout when setting a new alert
    useEffect(() => {
        let timeoutId;
        if (alert) {
            timeoutId = setTimeout(() => setAlert(null), 3000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [alert]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setAlert({ message: 'Has cerrado sesión exitosamente', type: 'info' });
    };

    return {
        user,
        setUser,
        isAuthOpen,
        setIsAuthOpen,
        authType,
        setAuthType,
        alert,
        setAlert,
        handleLogout,
    };
};

export default useAuth;