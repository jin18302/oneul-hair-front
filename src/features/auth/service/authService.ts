
import { axiosInstance } from "../../../common/config/axiosInstance";
import { imageService } from "../../image/service/imageService";
import type { LoginRequest, UserSignupRequest } from "../type/request";
import type { LoginResponse, SignUpResposne } from "../type/response";

export const authService = {

    login: async (request: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
            email: request.email,
            password: request.password,

        });
        return response.data;
    },

    signUp: async (request: UserSignupRequest) => {

        if (request.profileImage) {
            const url = await imageService.getPostPresignedUrl("profile", request.profileImage.name);
            await imageService.putImage(url.url, request.profileImage);
        }

        const signUpResponse = await axiosInstance.post<SignUpResposne>("/auth/signup", {
            name: request.name,
            email: request.email,
            password: request.password,
            phoneNumber: request.phoneNumber,
            gender: request.gender,
            userRole: "CUSTOMER"
        });
        return signUpResponse.data;
    }
}