import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import { getAccessToken } from "../../../utils/tokenmanager";
import type { UserRes } from "../type/UserRes";

export const userService = {

    getUserInfo: async (): Promise<UserRes> => {

        try {
            const response = await axiosInstance.get<UserRes>(`/users`, {
                headers: { 'Authorization': getAccessToken() }
            });
            return response.data;
            
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "개인 정보조회에 실패하였습니다.");
                }
            }
            throw e;
        }
    }
}