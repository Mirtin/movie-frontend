import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const axiosInstance = axios.create({
    baseURL: '/', 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get('access');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 404){
            window.location.replace('/404')
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = cookies.get('refresh');
            if (refreshToken) {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/accounts/token/refresh/', {"refresh":refreshToken });
                    const accessToken  = response.data.access;
                    cookies.set('access', accessToken, { path: '/', expires: new Date(Date.now() + 3600000) });
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    console.log('The token was refreshed')
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
