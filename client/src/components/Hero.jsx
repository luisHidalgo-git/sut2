import { motion } from 'framer-motion'

const Hero = () => {
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
                        Stays University Technological (SUT)
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Busca tus próximas estadías profesionales
                    </p>
                    <p className="text-lg md:text-xl text-gray-300">
                        Como estudiante contacta con una empresa, solicita la información adecuada y realiza tus prácticas profesionales.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero