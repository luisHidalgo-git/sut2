import { Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormField = ({ field, handleInputChange, validationErrors, showPassword, setShowPassword }) => {
    if (field.name === 'password') {
        return (
            <div className="flex-1 relative">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleInputChange}
                    isInvalid={!!validationErrors[field.name]}
                    className="w-full border-none focus:ring-0"
                    autoComplete="off"
                    autoFocus={false}
                />
                <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
        );
    }

    if (field.type === 'select') {
        return (
            <Form.Select
                name={field.name}
                onChange={handleInputChange}
                isInvalid={!!validationErrors[field.name]}
                className="flex-1 border-none focus:ring-0"
                autoFocus={false}
            >
                <option value="">Seleccione tipo de empresa</option>
                {field.options.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </Form.Select>
        );
    }

    return (
        <Form.Control
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleInputChange}
            isInvalid={!!validationErrors[field.name]}
            className="flex-1 border-none focus:ring-0"
            autoComplete="off"
            autoFocus={false}
        />
    );
};

export default FormField;