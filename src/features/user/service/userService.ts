
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { UserRes } from "../type/UserRes";

export const userService = {
    getUser: async () => {
        const response = await axiosInstance.get<UserRes>(`/users`);
        return response.data;
    }
}