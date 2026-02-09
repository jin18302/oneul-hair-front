import axios, { type InternalAxiosRequestConfig } from "axios";
import { getAccessToken, hasAccessToken } from "../../utils/tokenmanager";

//내부 서버 통신용
export const axiosInstance = axios.create({ baseURL: "http://localhost:8080/api" });

//requestInterceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

   
    if (hasAccessToken()) { 
        config.headers['Authorization'] = `${getAccessToken()}`;
         console.log("토큰 설정");
     }
    //TODO 리프래시 토큰 재발급 api 호출
    return config;

});

export const minioClient = axios.create();

