import api from '../api/axios';

export const registerService = async(payload) => {
    const response = await api.post('/auth/register/',payload);

    return response.data;
};


export const loginService = async(payload) => {
    const response = await api.post('/auth/login/', payload);

    return response.data;
};