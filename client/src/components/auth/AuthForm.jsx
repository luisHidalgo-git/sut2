import { Form } from 'react-bootstrap';
import FormField from './FormField';
import { formFields } from './FormFields';

const AuthForm = ({
    type,
    userType,
    handleInputChange,
    validationErrors,
    showPassword,
    setShowPassword,
}) => {
    return (
        <>
            {(type === 'login' ? formFields.login : formFields.register[userType]).map((field, index) => (
                <Form.Group key={index} className="relative">
                    <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-primary-light">
                        <field.icon className="text-gray-400 text-xl mr-3" />
                        <FormField
                            field={field}
                            handleInputChange={handleInputChange}
                            validationErrors={validationErrors}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    </div>
                    {validationErrors[field.name] && (
                        <div className="text-red-500 text-sm mt-1">
                            {validationErrors[field.name]}
                        </div>
                    )}
                </Form.Group>
            ))}
        </>
    );
};

export default AuthForm;