import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
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
        showAlert
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
                <Dashboard user={user} />
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
                            showAlert(`Bienvenido ${userData.nombre}`, 'success');
                        }}
                        onError={(message) => showAlert(message, 'danger')}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
}

export default App;