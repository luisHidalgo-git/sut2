import { FaEnvelope, FaLock, FaUser, FaBuilding, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

export const formFields = {
    login: [
        { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
        { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' },
    ],
    register: {
        estudiante: [
            { name: 'nombre', icon: FaUser, type: 'text', placeholder: 'Nombre' },
            { name: 'apellido', icon: FaUser, type: 'text', placeholder: 'Apellido' },
            { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
            { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' },
            { name: 'carrera', icon: FaUser, type: 'text', placeholder: 'Carrera' },
            { name: 'semestre', icon: FaUser, type: 'number', placeholder: 'Semestre' },
            { name: 'telefono', icon: FaPhone, type: 'tel', placeholder: 'Teléfono' },
        ],
        empresa: [
            { name: 'nombre', icon: FaBuilding, type: 'text', placeholder: 'Nombre de la empresa' },
            { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
            { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' },
            { name: 'direccion', icon: FaBuilding, type: 'text', placeholder: 'Dirección' },
            { name: 'telefono', icon: FaPhone, type: 'tel', placeholder: 'Teléfono' },
            {
                name: 'tipo',
                icon: FaBuilding,
                type: 'select',
                placeholder: 'Tipo de empresa',
                options: ['pequeña', 'mediana', 'grande'],
            },
        ],
    },
};