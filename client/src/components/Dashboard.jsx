import { motion } from 'framer-motion'

const Dashboard = ({ user }) => {
    if (!user) return null;

    const userType = user.carrera ? 'Estudiante' : 'Empresa';
    const userName = user.carrera ? `${user.nombre} ${user.apellido}` : user.nombre;

    return (
        <section className="relative bg-primary-dark text-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Hola {userType} {userName}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Bienvenido a tu panel de control
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Dashboard;