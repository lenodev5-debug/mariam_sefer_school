import api from '../service/api';

const login = async (email, password) => {
    try {
        const response = await api.post(
            '/api/auth/login',
            {
                email,
                password,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export default {
    login,
};