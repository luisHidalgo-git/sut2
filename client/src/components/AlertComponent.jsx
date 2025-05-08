import Swal from 'sweetalert2';
import { useEffect } from 'react';

const AlertComponent = ({ alert, onClose }) => {
    useEffect(() => {
        if (alert) {
            Swal.fire({
                icon: alert.type === 'success' ? 'success' : alert.type === 'info' ? 'info' : 'error',
                title: alert.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didClose: onClose,
            });
        }
    }, [alert, onClose]);

    return null;
};

export default AlertComponent;