import { isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { CreateDesignerReq, UpdateDesignerReq } from "../type/request";
import type { DesignerDetail } from "../type/response";
import type DesignerSummaryRes from "../../../types/DesignerSummaryRes";

export const designerService = {

    createDesigner: async (request: CreateDesignerReq, token: string): Promise<DesignerDetail> => {

        try {
            const response = await axiosInstance.post<DesignerDetail>(`/shops/designers`,
                request,
                { headers: { 'Authorization': token } }
            );
            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "디자이너 생성중 문제가 발생했습니다.");
            }
            throw e;
        }

    },

    getDesignerListByOwner: async (token: string):Promise<DesignerSummaryRes[]> => {

        try {
            const reponse = await axiosInstance.get<DesignerSummaryRes[]>(`/shops/designers`,
                { headers: { 'Authorization': token } });

            return reponse.data;

        }catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "디자이너 조회 중 문제가 발생했습니다.");
            }
            throw e;
        }

    },

    getDesignerDetail: async (designerId: string | undefined): Promise<DesignerDetail> => {

        try {
            const response = await axiosInstance.get<DesignerDetail>(`/auth/designers/${designerId}`);
            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) {
                alert(e.response?.data?.errorMessage ?? "디자이너 생성중 문제가 발생했습니다.");
            }
            throw e;
        }

    },

    updateDesingerInfo: async (designerId: string | undefined, token: string, reauest: UpdateDesignerReq): Promise<DesignerDetail> => {

        try {

            const response = await axiosInstance.patch<DesignerDetail>(`/designers/${designerId}`,
                reauest,
                { headers: { 'Authorization': token } }
            );

            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) {
                alert(e.response?.data?.errorMessage ?? "잠시후 다시 시도해주세요.");
            }

            throw e;
        }

    }
}