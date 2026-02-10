
import { axiosInstance } from "../../../common/config/axiosInstance";
import { setAccessToken } from "../../../utils/tokenmanager";
import { imageService } from "../../image/service/imageService";
import type { LoginRequest, UserSignupRequest } from "../type/request";
import type { LoginResponse, SignUpResposne } from "../type/response";

export const authService = {

    _imageCategory:"profile",

    login: async (request: LoginRequest) => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
            email: request.email,
            password: request.password,

        });
        setAccessToken(response.data.accessToken);
    },

    signUp: async (request: UserSignupRequest) => {

        let presignedRes;

        if (request.profileImage) {
            presignedRes = await imageService.getPostPresignedUrl(authService._imageCategory, request.profileImage.name);
            await imageService.putImage(presignedRes.url, request.profileImage);
        }

        const signUpResponse = await axiosInstance.post<SignUpResposne>("/auth/signup", {
            name: request.name,
            profileImage: presignedRes?.imageName ?? null,
            email: request.email,
            password: request.password,
            phoneNumber: request.phoneNumber,
            gender: request.gender,
            userRole: "CUSTOMER"

        });
        return signUpResponse.data;
    }
}