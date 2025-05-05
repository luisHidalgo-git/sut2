import { motion } from 'framer-motion'
import { FaUserGraduate, FaBuilding, FaHandshake } from 'react-icons/fa'

const features = [
    {
        icon: FaUserGraduate,
        title: "Completa tu perfil",
        description: "Para una mejor presentación al público."
    },
    {
        icon: FaBuilding,
        title: "Solicita información",
        description: "A las empresas sobre los puestos de tu interés."
    },
    {
        icon: FaHandshake,
        title: "Realiza tu residencia",
        description: "Y desarrolla tus prácticas dentro de la empresa."
    }
]

const Features = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                        >
                            <feature.icon className="text-4xl text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features