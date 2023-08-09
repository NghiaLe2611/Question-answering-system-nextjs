import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
// import queryString from 'query-string';

axios.defaults.withCredentials = true;
const axiosClient = axios.create({
    baseURL: process.env.API_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    timeout: 10000
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = Cookies.get('token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        // config.headers.Authorization = accessToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;