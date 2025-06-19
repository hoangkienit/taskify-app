import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
    timeout: 20000
});


// 🟢 Interceptor request
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");
        const lng = localStorage.getItem("lng");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (lng) {
            config.headers['Accept-Language'] = lng;
        } else {
            config.headers['Accept-Language'] = "vi";
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
