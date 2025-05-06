import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AlertComponent from '../components/AlertComponent';

const MainLayout = ({ children, user, onAuthClick, onLogout, alert, onAlertClose }) => {
    return (
        <div className="min-h-screen bg-background-light">
            <Navbar 
                onAuthClick={onAuthClick} 
                user={user} 
                onLogout={onLogout}
                className="bg-green-700 text-white"
            />

            <AlertComponent alert={alert} onClose={onAlertClose} />

            <main>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;