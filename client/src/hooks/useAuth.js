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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        showAlert('Has cerrado sesión exitosamente', 'info');
    };

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    return {
        user,
        setUser,
        isAuthOpen,
        setIsAuthOpen,
        authType,
        setAuthType,
        alert,
        handleLogout,
        showAlert
    };
};

export default useAuth;