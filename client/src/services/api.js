import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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