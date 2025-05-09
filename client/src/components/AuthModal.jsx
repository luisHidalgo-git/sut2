import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { login, registerStudent, registerCompany } from '../services/api';
import Swal from 'sweetalert2';
import LoginSection from './auth/LoginSection';
import RegisterSection from './auth/RegisterSection';
import WelcomeSection from './auth/WelcomeSection';

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
        if (!validateForm()) return;
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
                
                await showSuccessAlert(
                    type === 'login' ? '¡Bienvenido!' : '¡Registro exitoso!',
                    type === 'login' 
                        ? `Has iniciado sesión como ${response.user.nombre}`
                        : 'Tu cuenta ha sido creada correctamente'
                );
                
                onLoginSuccess(response.user);
                onClose();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en la operación';
            onError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formProps = {
        type,
        userType,
        handleInputChange,
        validationErrors,
        showPassword,
        setShowPassword,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
        >
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl shadow-lg">
                <AnimatePresence mode="wait">
                    {type === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="flex flex-col md:flex-row w-full"
                        >
                            <WelcomeSection type={type} onTypeChange={onTypeChange} />
                            <LoginSection
                                onClose={onClose}
                                handleSubmit={handleSubmit}
                                loading={loading}
                                formProps={formProps}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="flex flex-col md:flex-row w-full"
                        >
                            <RegisterSection
                                onClose={onClose}
                                handleSubmit={handleSubmit}
                                loading={loading}
                                formProps={formProps}
                                userType={userType}
                                setUserType={setUserType}
                            />
                            <WelcomeSection type={type} onTypeChange={onTypeChange} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AuthModal;