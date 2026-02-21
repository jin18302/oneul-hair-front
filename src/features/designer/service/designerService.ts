
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { CreateDesignerReq, UpdateDesignerReq } from "../type/request";
import type { DesignerDetail, DesignerSummaryRes } from "../type/response";

export const designerService = {

    createDesigner: async (request: CreateDesignerReq) => {
        const response = await axiosInstance.post<DesignerDetail>(`/shops/designers`, request);
        return response.data;
    },

    readDesigner: async (designerId: string) => {
        const response = await axiosInstance.get<DesignerDetail>(`/auth/designers/${designerId}`);
        return response.data;
    },
    updateDesigner: async (designerId: string, requestBody: UpdateDesignerReq) => {
        const response = await axiosInstance.patch<DesignerDetail>(`/designers/${designerId}`, requestBody);
        return response.data;
    },
    getDesignerListByShop: async (shopId: string) => {
        const response = await axiosInstance.get<DesignerSummaryRes[]>(`/auth/shops/${shopId}/designers`)
        return response.data;
    },

    getMyDesignerList : async () => {
            const response = await axiosInstance.get<DesignerSummaryRes[]>(`/shops/designers`)
            return response.data;
        }

}