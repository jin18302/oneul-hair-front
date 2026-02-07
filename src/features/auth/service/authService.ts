
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { LoginRequest, UserSignupRequest } from "../type/request";
import type { LoginResponse } from "../type/response";

export const authService = {

    login: async (request: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>("/auth/signup", {
            email: request.email,
            password: request.password,

        });
        return response.data;
    },

    signUp: async (request: UserSignupRequest) => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {


            name: request.name,
            email: request.email,
            password: request.password,
            phoneNumber: request.phoneNumber,
            gender: request.gender,
            userRole: "CUSTOMER"
        });
        return response.data;
    }
}