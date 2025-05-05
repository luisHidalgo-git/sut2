import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Form } from 'react-bootstrap';
import { login, registerStudent, registerCompany } from '../services/api';

const AuthModal = ({ isOpen, onClose, type, onTypeChange, onLoginSuccess, onError }) => {
    const [userType, setUserType] = useState('estudiante');
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationErrors({
            ...validationErrors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'El correo electrónico es requerido';
        if (!formData.password) errors.password = 'La contraseña es requerida';

        if (type === 'register') {
            if (!formData.nombre) errors.nombre = 'El nombre es requerido';
            if (userType === 'estudiante') {
                if (!formData.apellido) errors.apellido = 'El apellido es requerido';
                if (!formData.carrera) errors.carrera = 'La carrera es requerida';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            onError('Por favor complete todos los campos requeridos');
            return;
        }

        setLoading(true);

        try {
            let response;

            if (type === 'login') {
                response = await login(formData);
                onLoginSuccess(response.user);
            } else {
                if (userType === 'estudiante') {
                    response = await registerStudent(formData);
                } else {
                    response = await registerCompany(formData);
                }
                onLoginSuccess(response.user);
            }

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            onClose();
        } catch (error) {
            onError(error.response?.data?.message || 'Error en la operación');
        } finally {
            setLoading(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };

    const formFields = {
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

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                    </button>
                </div>

                {type === 'register' && (
                    <div className="mb-6">
                        <Form.Select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
                        >
                            <option value="estudiante">Estudiante</option>
                            <option value="empresa">Empresa</option>
                        </Form.Select>
                    </div>
                )}

                <Form onSubmit={handleSubmit} className="space-y-4">
                    {(type === 'login' ? formFields.login : formFields.register[userType]).map((field, index) => (
                        <Form.Group key={index} className="relative">
                            <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-primary-light">
                                <field.icon className="text-gray-400 text-xl mr-3" />
                                {field.name === 'password' ? (
                                    <div className="flex-1 relative">
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            onChange={handleInputChange}
                                            isInvalid={!!validationErrors[field.name]}
                                            className="w-full border-none focus:ring-0"
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                ) : field.type === 'select' ? (
                                    <Form.Select
                                        name={field.name}
                                        onChange={handleInputChange}
                                        isInvalid={!!validationErrors[field.name]}
                                        className="flex-1 border-none focus:ring-0"
                                    >
                                        <option value="">Seleccione tipo de empresa</option>
                                        {field.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </Form.Select>
                                ) : (
                                    <Form.Control
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={handleInputChange}
                                        isInvalid={!!validationErrors[field.name]}
                                        className="flex-1 border-none focus:ring-0"
                                    />
                                )}
                            </div>
                            <Form.Control.Feedback type="invalid" className="text-red-500 text-sm mt-1">
                                {validationErrors[field.name]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </Form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => onTypeChange(type === 'login' ? 'register' : 'login')}
                        className="text-primary hover:text-primary-dark"
                    >
                        {type === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthModal;