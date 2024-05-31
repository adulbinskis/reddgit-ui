import axios from 'axios';

export const API_URL = `https://localhost:7148/api`;

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

$api.interceptors.request.use((config) => {  // Intervepter )
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 403) {
            console.log('Access forbidden');
        }

        if (error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        }

        return Promise.reject(error);
    }
);

export default $api;