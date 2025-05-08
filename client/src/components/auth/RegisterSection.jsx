import { Form } from 'react-bootstrap';
import { FaTwitter, FaInstagram, FaTwitch, FaTiktok } from 'react-icons/fa';
import AuthForm from './AuthForm';
import UserTypeSelect from './UserTypeSelect';

const socialIcons = [
    { Icon: FaTwitch, href: "#" },
    { Icon: FaTwitter, href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: FaTiktok, href: "#" }
];

const RegisterSection = ({ onClose, handleSubmit, loading, formProps, userType, setUserType }) => {
    return (
        <div className="w-1/2 p-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Registrarse</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                </button>
            </div>
            <div className="flex gap-4 justify-center mb-8">
                {socialIcons.map(({ Icon, href }, index) => (
                    <a
                        key={index}
                        href={href}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                        <Icon />
                    </a>
                ))}
            </div>
            <UserTypeSelect userType={userType} setUserType={setUserType} />
            <Form onSubmit={handleSubmit} className="space-y-4">
                <AuthForm {...formProps} />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>
            </Form>
        </div>
    );
}

export default RegisterSection;