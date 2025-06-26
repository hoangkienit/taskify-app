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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const status = error.response.status;
            const code = error.response.code || error.response.data.code;
            console.log("Error response:", error.response);
            if (status === 401 && (code === "UNAUTHORIZED" || code === "TOKEN_EXPIRED")) {
                console.warn("Access token expired, trying to refresh...");
                window.location.href = "/logout";
            }
            else {
                console.log(error);
                throw new Error(error.response.data.message || "Có lỗi xảy ra.")
            }
        } else if (error.request) {
            console.log(error);
            throw new Error("Lỗi kết nối. Vui lòng thử lại sau.");
        } else {
            throw new Error("Lỗi hệ thống");
        }
        

        return Promise.reject(error);
    }
);

export default api;
