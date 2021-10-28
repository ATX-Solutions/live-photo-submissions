import axios, { AxiosError } from 'axios';
import { RouteComponentProps } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const setToken = (token: string) => {
    axiosInstance.defaults.headers.common.Authorization = token;
};

// export const unsetToken = () => {
//     axiosInstance.defaults.headers.common.Authorization = '';
// };

export const setInterceptor = (history: RouteComponentProps['history']) => {
    axiosInstance.interceptors.response.use(undefined, function (error: Error | AxiosError) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;
            switch (status) {
                case 404: {
                    history.push('/404');
                    break;
                }
                case 500: {
                    // snackbar
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            // snackbar
            // network error
        }

        return Promise.reject(error);
    });
};

export default axiosInstance;
