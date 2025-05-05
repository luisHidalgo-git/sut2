import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
    if (!user) return null;

    const userType = user.carrera ? 'Estudiante' : 'Empresa';
    const userName = user.carrera 
        ? `${user.nombre} ${user.apellido || ''}`.trim() 
        : user.nombre;

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
                        ¡Bienvenido {userType}!
                    </h1>
                    <p className="text-xl md:text-2xl mb-4 text-gray-200">
                        {userName}
                    </p>
                    {user.carrera && (
                        <div className="space-y-2">
                            <p className="text-lg text-gray-300">
                                Carrera: {user.carrera}
                            </p>
                            <p className="text-lg text-gray-300">
                                Semestre: {user.semestre}
                            </p>
                        </div>
                    )}
                    {user.tipo && (
                        <p className="text-lg text-gray-300 mt-2">
                            Empresa {user.tipo}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Dashboard;