import { Alert } from 'react-bootstrap';

const AlertComponent = ({ alert, onClose }) => {
    if (!alert) return null;

    return (
        <Alert
            variant={alert.type}
            className="fixed top-4 right-4 z-50 shadow-lg"
            onClose={onClose}
            dismissible
        >
            {alert.message}
        </Alert>
    );
};

export default AlertComponent;