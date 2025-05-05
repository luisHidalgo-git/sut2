import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaPhone } from 'react-icons/fa'

const AuthModal = ({ isOpen, onClose, type, onTypeChange }) => {
    const [userType, setUserType] = useState('estudiante')

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    }

    const formFields = {
        login: [
            { icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
            { icon: FaLock, type: 'password', placeholder: 'Contraseña' }
        ],
        register: {
            estudiante: [
                { icon: FaUser, type: 'text', placeholder: 'Nombre' },
                { icon: FaUser, type: 'text', placeholder: 'Apellido' },
                { icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
                { icon: FaLock, type: 'password', placeholder: 'Contraseña' },
                { icon: FaUser, type: 'text', placeholder: 'Carrera' },
                { icon: FaUser, type: 'number', placeholder: 'Semestre' },
                { icon: FaPhone, type: 'tel', placeholder: 'Teléfono' }
            ],
            empresa: [
                { icon: FaBuilding, type: 'text', placeholder: 'Nombre de la empresa' },
                { icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
                { icon: FaLock, type: 'password', placeholder: 'Contraseña' },
                { icon: FaBuilding, type: 'text', placeholder: 'Dirección' },
                { icon: FaPhone, type: 'tel', placeholder: 'Teléfono' },
                {
                    icon: FaBuilding, type: 'select', placeholder: 'Tipo de empresa',
                    options: ['pequeña', 'mediana', 'grande']
                }
            ]
        }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>

                {type === 'register' && (
                    <div className="mb-6">
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="estudiante">Estudiante</option>
                            <option value="empresa">Empresa</option>
                        </select>
                    </div>
                )}

                <form className="space-y-4">
                    {(type === 'login' ? formFields.login : formFields.register[userType]).map((field, index) => (
                        <div key={index} className="relative">
                            <field.icon className="absolute left-3 top-3 text-gray-400" />
                            {field.type === 'select' ? (
                                <select className="w-full pl-10 pr-3 py-2 border rounded">
                                    <option value="">Seleccione tipo de empresa</option>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full pl-10 pr-3 py-2 border rounded"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                    >
                        {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>

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
    )
}

export default AuthModal