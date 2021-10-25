import axios from 'axios';
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
    axiosInstance.interceptors.response.use(undefined, function (error) {
        const { status } = error.response;
        switch (status) {
            case 404: {
                history.push('/404');
            }
        }
        return Promise.reject(error);
    });
};

export default axiosInstance;
