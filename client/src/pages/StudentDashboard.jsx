import { motion } from 'framer-motion';

const StudentDashboard = ({ user }) => {
    if (!user) return null;

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
                        ¡Bienvenido Estudiante!
                    </h1>
                    <p className="text-xl md:text-2xl mb-4 text-gray-200">
                        {`${user.nombre} ${user.apellido || ''}`}
                    </p>
                    <div className="space-y-2">
                        <p className="text-lg text-gray-300">
                            Carrera: {user.carrera}
                        </p>
                        <p className="text-lg text-gray-300">
                            Semestre: {user.semestre}
                        </p>
                    </div>
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Postulaciones</h3>
                            <p className="text-gray-300">Gestiona tus postulaciones activas</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">CV</h3>
                            <p className="text-gray-300">Actualiza tu currículum vitae</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Perfil</h3>
                            <p className="text-gray-300">Completa tu información personal</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StudentDashboard;