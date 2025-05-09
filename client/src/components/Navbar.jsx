import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'

const Navbar = ({ onAuthClick, user, onLogout }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleLogoutClick = () => {
        setShowLogoutModal(true)
    }

    const handleConfirmLogout = () => {
        setShowLogoutModal(false)
        onLogout()
    }

    return (
        <>
            <nav className="bg-primary px-4 py-4">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
                        <span className="text-white text-xl font-bold">SUT</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-wrap items-center gap-2"
                    >
                        {user ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-white text-sm md:text-base truncate max-w-[150px] md:max-w-none">
                                    {user.carrera ? `${user.nombre} ${user.apellido}` : user.nombre}
                                </span>
                                <button
                                    onClick={handleLogoutClick}
                                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onAuthClick('login')}
                                    className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                                >
                                    <FaUserCircle className="text-lg" />
                                    <span>Iniciar Sesión</span>
                                </button>
                                <button
                                    onClick={() => onAuthClick('register')}
                                    className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                                >
                                    <FaUserCircle className="text-lg" />
                                    <span>Registrarse</span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </nav>

            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar cierre de sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que quieres cerrar sesión?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className="bg-primary" onClick={handleConfirmLogout}>
                        Cerrar Sesión
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navbar