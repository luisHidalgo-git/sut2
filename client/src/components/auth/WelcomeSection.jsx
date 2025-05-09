const WelcomeSection = ({ type, onTypeChange }) => {
    if (type === 'login') {
        return (
            <div className="w-full md:w-1/2 bg-primary p-6 md:p-12 text-white flex flex-col justify-center items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¡Bienvenido!</h2>
                <p className="text-center mb-8">
                    Ingrese sus datos personales para usar todas las funciones del sitio
                </p>
                <button
                    onClick={() => onTypeChange('register')}
                    className="border-2 border-white text-white px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-primary transition-colors"
                >
                    Registrarse
                </button>
            </div>
        );
    }

    return (
        <div className="w-full md:w-1/2 bg-primary p-6 md:p-12 text-white flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¡Hola!</h2>
            <p className="text-center mb-8">
                Regístrese con sus datos personales para usar todas las funciones del sitio
            </p>
            <button
                onClick={() => onTypeChange('login')}
                className="border-2 border-white text-white px-6 md:px-8 py-2 rounded-full hover:bg-white hover:text-primary transition-colors"
            >
                Iniciar Sesión
            </button>
        </div>
    );
};

export default WelcomeSection;