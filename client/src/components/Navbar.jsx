import { motion } from 'framer-motion'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = ({ onAuthClick }) => {
    return (
        <nav className="bg-primary px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                    className="flex gap-4"
                >
                    <button
                        onClick={onAuthClick}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaUserCircle className="text-xl" />
                        <span>Iniciar Sesión</span>
                    </button>
                </motion.div>
            </div>
        </nav>
    )
}

export default Navbar