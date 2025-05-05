import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import AlertComponent from './components/AlertComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState(null);

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

    return (
        <div className="min-h-screen bg-background-light">
            <Navbar 
                onAuthClick={() => setIsAuthOpen(true)} 
                user={user} 
                onLogout={handleLogout}
                className="bg-green-700 text-white" // Cambiado a verde
            />

            <AlertComponent alert={alert} onClose={() => setAlert(null)} />

            <main>
                {user ? (
                    <Dashboard user={user} />
                ) : (
                    <>
                        <Hero className="bg-green-600 text-white" /> {/* Fondo verde */}
                        <Features />
                    </>
                )}
            </main>

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
        </div>
    );
}

export default App;