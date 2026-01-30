import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { AddrRes } from "../type/response";

export const shopSearchService = {

    getAllAddress: async (areaCode: string | undefined): Promise<AddrRes[]> => {

        try {
            const response = await axiosInstance.get<AddrRes[]>('/auth/address', { params: { code: areaCode } });
            return response.data;
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "shop 등록에 실패하였습니다.");
                }
            }

            throw e;
        }
    }
}