import Swal from 'sweetalert2';
import { useEffect } from 'react';

const AlertComponent = ({ alert, onClose }) => {
    useEffect(() => {
        if (alert) {
            Swal.fire({
                icon: alert.type === 'success' ? 'success' : alert.type === 'info' ? 'info' : 'error',
                title: alert.message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didClose: onClose,
            });
        }
    }, [alert, onClose]);

    return null; // No se necesita renderizar nada directamente
};

export default AlertComponent;