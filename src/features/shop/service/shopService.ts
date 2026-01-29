import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { ShopTag } from "../../../types/ShopTag";
import type { ShopDetailRes } from "../../../types/ShopDetailRes";
import type { CursorPageResponse } from "../../../types/CursorPageResponse";
import type { ShopSummaryResponse } from "../../../types/ShopSummaryReponse";
import type { CreateShopReq } from "../type/CreateShopReq";

export const shopService = {

    createShop: async (request: CreateShopReq) => {

        try {
             await axiosInstance.post<ShopDetailRes>("/auth/shops", request);
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "shop 등록에 실패하였습니다.");
                }
            }

            throw e;
        }
    },

    getShopTagList: async (): Promise<ShopTag[]> => {
        try {
            const respone = await axiosInstance.get<ShopTag[]>("/auth/shop-tags");
            return respone.data;

        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "개인 정보조회에 실패하였습니다.");
                }
            }
            throw e;
        }
    },

    getShopDetailById: async (shopId: string | undefined): Promise<ShopDetailRes> => {

        try {
            const response = await axiosInstance.get<ShopDetailRes>(`/auth/shops/${shopId}`);
            return response.data;
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "shop 정보 조회에 실패하였습니다.");
                }
            }

            throw e;
        }
    },

    getShopDetailByOwner: async (token: string): Promise<ShopDetailRes> => {

        try {
            const responose = await axiosInstance.get('/shops', { headers: { 'Authorization': token } });
            return responose.data;

        } catch (e: unknown) {
            if (isAxiosError(e)) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data?.errorMessage ?? "shop 정보 조회에 실패하였습니다.");
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