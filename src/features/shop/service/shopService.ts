
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { ShopTag } from "../type/entity";
import type { CreateShopReq, UpdateShopReq } from "../type/request";
import type { ShopDetailRes } from "../type/response";

export const shopService = {
    createShop: async (request: CreateShopReq) => {
        const respone = await axiosInstance.post<ShopDetailRes>("/auth/shops", request);
        return respone.data;
    },

    updateShop: async (shopId: number, request: UpdateShopReq) => {
        return await axiosInstance.patch<ShopDetailRes>(`/shops/${shopId}`, request);
    },
    getShopTagList: async () => {
        const respone = await axiosInstance.get<ShopTag[]>("/auth/shop-tags");
        return respone.data;
    },
    getShop: async (shopId: string) => {
        const response = await axiosInstance.get<ShopDetailRes>(`/auth/shops/${shopId}`);
        return response.data;
    },
    getMyShop: async () => {
        const response = await axiosInstance.get<ShopDetailRes>(`/shops`);
        return response.data;
    }
}