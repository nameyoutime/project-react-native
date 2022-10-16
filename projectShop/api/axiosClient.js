import axios from 'axios';
import queryString from 'query-string';
// import { API_KEY } from '@env'
const API_KEY = 'http://192.168.102.4:8080/api'
const axiosClient = axios.create({
    baseURL: API_KEY,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;