import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { LoginRequest, UserSignupRequest } from "../type/request";
import { setAccessToken } from "../../../utils/tokenmanager";

export const authService = {

    signUp: async (request: UserSignupRequest) => {
        try {
            await axiosInstance.post("/auth/signup", {
                name: request.name,
                email: request.email,
                password: request.password,
                phoneNumber: request.phoneNumber,
                gender: request.gender,
                userRole: "CUSTOMER"
            })
            alert("회원가입이 완료되었습니다.")
        } catch (e) {

            if (e instanceof AxiosError) {
                alert(e.response?.data?.errorMessage ?? "회원가입에 실패하였습니다.");
            }
        }


    },

    login: async (request: LoginRequest)=> {

        try {
            const response = await axiosInstance.post("/auth/login", {
                email: request.email,
                password: request.password
            });

            setAccessToken(response.data.accessToken);

        } catch (e: unknown) {

            if (isAxiosError(e)) {
                alert(e.response?.data?.errorMessage ?? "로그인에 실패하였습니다.");
                return;
            }
        }

    }

}
