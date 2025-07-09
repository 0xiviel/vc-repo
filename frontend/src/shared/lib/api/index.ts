import { APP_TOKEN_KEY } from '@shared/constants';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(APP_TOKEN_KEY);

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized globally
            console.error('Unauthorized! Redirecting to login...');
            localStorage.removeItem(APP_TOKEN_KEY);
            window.location.href = '/signin'; // or use a router redirect
        }

        return Promise.reject(error);
    }
);
