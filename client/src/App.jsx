import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AuthModal from './components/AuthModal';
import useAuth from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const {
        user,
        setUser,
        isAuthOpen,
        setIsAuthOpen,
        authType,
        setAuthType,
        alert,
        handleLogout,
    } = useAuth();

    const handleAuthClick = (type) => {
        setAuthType(type);
        setIsAuthOpen(true);
    };

    return (
        <MainLayout
            user={user}
            onAuthClick={handleAuthClick}
            onLogout={handleLogout}
            alert={alert}
            onAlertClose={() => setAlert(null)}
        >
            {user ? (
                user.carrera ? (
                    <StudentDashboard user={user} />
                ) : (
                    <CompanyDashboard user={user} />
                )
            ) : (
                <Home />
            )}

            <AnimatePresence>
                {isAuthOpen && (
                    <AuthModal 
                        isOpen={isAuthOpen}
                        onClose={() => setIsAuthOpen(false)}
                        type={authType}
                        onTypeChange={setAuthType}
                        onLoginSuccess={(userData) => {
                            setUser(userData);
                            setIsAuthOpen(false);
                        }}
                        onError={(message) => {
                            if (message !== 'Error en la operación') {
                                setAlert({ message, type: 'danger' });
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
}

export default App;