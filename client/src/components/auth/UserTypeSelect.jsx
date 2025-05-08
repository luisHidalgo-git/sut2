import { Form } from 'react-bootstrap';

const UserTypeSelect = ({ userType, setUserType }) => {
    return (
        <div className="mb-6">
            <Form.Select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
                <option value="estudiante">Estudiante</option>
                <option value="empresa">Empresa</option>
            </Form.Select>
        </div>
    );
};

export default UserTypeSelect;