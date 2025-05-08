import { motion } from 'framer-motion';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { login, registerStudent, registerCompany } from '../services/api';
import Swal from 'sweetalert2';
import AuthForm from './auth/AuthForm';
import UserTypeSelect from './auth/UserTypeSelect';

const AuthModal = ({ isOpen, onClose, type, onTypeChange, onLoginSuccess, onError }) => {
    const [userType, setUserType] = useState('estudiante');
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });

        setValidationErrors({
            ...validationErrors,
            [name]: '',
        });
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = type === 'login' 
            ? ['email', 'password']
            : userType === 'estudiante'
                ? ['nombre', 'apellido', 'email', 'password', 'carrera']
                : ['nombre', 'email', 'password'];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} es requerido`;
            }
        });

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email inválido';
        }

        if (formData.password && formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const showSuccessAlert = async (title, text) => {
        return await Swal.fire({
            icon: 'success',
            title,
            text,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            let response;

            if (type === 'login') {
                response = await login(formData);
            } else {
                if (userType === 'estudiante') {
                    response = await registerStudent(formData);
                } else {
                    response = await registerCompany(formData);
                }
            }

            if (response?.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                if (type === 'login') {
                    await showSuccessAlert('¡Bienvenido!', `Has iniciado sesión como ${response.user.nombre}`);
                } else {
                    await showSuccessAlert('¡Registro exitoso!', `Tu cuenta ha sido creada correctamente`);
                }
                
                onLoginSuccess(response.user);
                onClose();
                return;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en la operación';
            onError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                    </button>
                </div>

                {type === 'register' && (
                    <UserTypeSelect userType={userType} setUserType={setUserType} />
                )}

                <Form onSubmit={handleSubmit} className="space-y-4">
                    <AuthForm
                        type={type}
                        userType={userType}
                        handleInputChange={handleInputChange}
                        validationErrors={validationErrors}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => onTypeChange(type === 'login' ? 'register' : 'login')}
                            className="text-primary hover:text-primary-dark"
                        >
                            {type === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                </Form>
            </div>
        </motion.div>
    );
};

export default AuthModal;