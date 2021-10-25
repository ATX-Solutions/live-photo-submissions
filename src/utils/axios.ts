import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const setToken = (token: string) => {
    axiosInstance.defaults.headers.common.Authorization = token;
};

// export const unsetToken = () => {
//     axiosInstance.defaults.headers.common.Authorization = '';
// };

// export const setInterceptor = () => {
//     axiosInstance.interceptors.response.use(undefined, function (error) {
//         const { status } = error.response;
//         switch (status) {
//         }
//         return Promise.reject(error);
//     });
// };

export default axiosInstance;
