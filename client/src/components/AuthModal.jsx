import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaPhone } from 'react-icons/fa'
import { login, registerStudent, registerCompany } from '../services/api'
import toast from 'react-hot-toast'

const AuthModal = ({ isOpen, onClose, type, onTypeChange }) => {
    const [userType, setUserType] = useState('estudiante')
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let response

            if (type === 'login') {
                response = await login(formData)
                toast.success('Inicio de sesión exitoso')
            } else {
                if (userType === 'estudiante') {
                    response = await registerStudent(formData)
                    toast.success('Estudiante registrado exitosamente')
                } else {
                    response = await registerCompany(formData)
                    toast.success('Empresa registrada exitosamente')
                }
            }

            // Store token
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))

            onClose()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error en la operación')
        } finally {
            setLoading(false)
        }
    }

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    }

    const formFields = {
        login: [
            { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
            { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' }
        ],
        register: {
            estudiante: [
                { name: 'nombre', icon: FaUser, type: 'text', placeholder: 'Nombre' },
                { name: 'apellido', icon: FaUser, type: 'text', placeholder: 'Apellido' },
                { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
                { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' },
                { name: 'carrera', icon: FaUser, type: 'text', placeholder: 'Carrera' },
                { name: 'semestre', icon: FaUser, type: 'number', placeholder: 'Semestre' },
                { name: 'telefono', icon: FaPhone, type: 'tel', placeholder: 'Teléfono' }
            ],
            empresa: [
                { name: 'nombre', icon: FaBuilding, type: 'text', placeholder: 'Nombre de la empresa' },
                { name: 'email', icon: FaEnvelope, type: 'email', placeholder: 'Correo electrónico' },
                { name: 'password', icon: FaLock, type: 'password', placeholder: 'Contraseña' },
                { name: 'direccion', icon: FaBuilding, type: 'text', placeholder: 'Dirección' },
                { name: 'telefono', icon: FaPhone, type: 'tel', placeholder: 'Teléfono' },
                {
                    name: 'tipo', icon: FaBuilding, type: 'select', placeholder: 'Tipo de empresa',
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {(type === 'login' ? formFields.login : formFields.register[userType]).map((field, index) => (
                        <div key={index} className="relative">
                            <field.icon className="absolute left-3 top-3 text-gray-400" />
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 border rounded"
                                >
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
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 border rounded"
                                    required
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Cargando...' : type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
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