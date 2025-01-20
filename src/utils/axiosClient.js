import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) =>
        queryString.stringify({
            ...params,
            api_key: apiConfig.apiKey,
        }),
});

axiosClient.interceptors.request.use((config) => {
    // You can add additional request configurations here
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        // Handle successful responses
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        throw error;
    }
);

export default axiosClient;
