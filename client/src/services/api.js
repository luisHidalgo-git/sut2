import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const registerStudent = async (studentData) => {
    const response = await api.post('/auth/estudiantes/register', studentData);
    return response.data;
};

export const registerCompany = async (companyData) => {
    const response = await api.post('/auth/empresas/register', companyData);
    return response.data;
};

export default api;