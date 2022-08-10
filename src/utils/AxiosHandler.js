import react from 'react';
import axios from 'axios';
import ErrorCodeHandler from '../error/ErrorCodeHandler';

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.response.use(
    data => {
        return data
    },
    err => {
        ErrorCodeHandler(err.response.data)
        return Promise.reject(err)
    }
)

export default axiosInstance