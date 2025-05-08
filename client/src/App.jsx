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

    return (
        <MainLayout
            user={user}
            onAuthClick={() => setIsAuthOpen(true)}
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
                            // Only show error if there's an actual error
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