import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { AddrRes } from "../type/response";
import type { CursorPageResponse } from "../../../types/CursorPageResponse";
import type { ShopSummaryResponse } from "../../shop/type/response";

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
    },
    
     getShopListByFiltering: async (area: string | null, tagIdList: string[], lastCursor: string | null): Promise<CursorPageResponse<ShopSummaryResponse>> => {

        try {
            const response = await axiosInstance.get<CursorPageResponse<ShopSummaryResponse>>("/auth/shops"
                , { params: { area: area, tagIdList: tagIdList, lastCursor: lastCursor } }
            );
            return response.data;
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "shop 정보 조회에 실패하였습니다.");
                }
            }

            throw e;
        }
    }
}