
import { axiosInstance } from "../../../common/config/axiosInstance";
import { setAccessToken } from "../../../utils/tokenmanager";
import { imageService } from "../../image/service/imageService";
import type { ShopDetailRes } from "../../shop/type/response";
import type { OwnerSignUpData, SignupData } from "../type/formData";
import type { LoginRequest } from "../type/request";
import type { LoginResponse, SignUpResposne } from "../type/response";
import { requestMapper } from "../utils/requestMapper";

export const authService = {

    _imageCategory: "profile",

    login: async (request: LoginRequest) => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
            email: request.email,
            password: request.password,

        });
        setAccessToken(response.data.accessToken);
    },

    signUp: async (formData: SignupData) => {

        let presignedRes;

        if (formData.profileImage) {
            presignedRes = await imageService.getPostPresignedUrl(authService._imageCategory, formData.profileImage.name);
            await imageService.putImage(presignedRes.url, formData.profileImage);
        }

        const request = requestMapper.toUserSignupReq(formData, presignedRes?.imageName);

        console.log("request", request);

        const signUpResponse = await axiosInstance.post<SignUpResposne>("/auth/signup", request);
        return signUpResponse.data;
    },

    ownerSignUp: async (formData: OwnerSignUpData) => {

        let presignedRes;

        if (formData.mainImage) {
            presignedRes = await imageService.getPostPresignedUrl(authService._imageCategory, formData.mainImage.name);
            await imageService.putImage(presignedRes.url, formData.mainImage);
        }

        const request = requestMapper.toOwnerSignUpReq(formData, presignedRes?.imageName);

        console.log("request", request);

        const respone = await axiosInstance.post<ShopDetailRes>("/auth/shops", request);
        return respone.data;
    },
}