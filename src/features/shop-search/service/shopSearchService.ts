import { axiosInstance } from "../../../common/config/axiosInstance";
import type { CursorPageResponse } from "../../../common/types/CursorPageResponse";
import type { ShopSummaryResponse } from "../../shop/type/response";
import type { AddrRes } from "../type/response";

export const shopSearchService = {
    getAddress: async (areaCode: string) => {
        const response = await axiosInstance.get<AddrRes[]>('/auth/address', { params: { code: areaCode } });
        return response.data;
    },

    getFilteringShop: async (area: string | null, tagIdList: string[], lastCursor: string | null) => {
        const response = await axiosInstance.get<CursorPageResponse<ShopSummaryResponse>>("/auth/shops"
            , { params: { area: area, tagIdList: tagIdList, lastCursor: lastCursor } }
        );
        return response.data;
    }

}