import { isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { CreateMenuReq, UpdateMenuReq } from "../type/request";
import type { MenuRes } from "../type/response";

export const menuService = {

    createMenu: async (designerId: string | undefined, requestList: CreateMenuReq[], token: string) => {
        try {
            await axiosInstance.post(`/designers/${designerId}/service-menus`,
                requestList, { headers: { 'Authorization': token } });
        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "디자이너 생성 중 문제가 발생했습니다.");
            }
            throw e;
        }
    },

    updateMenu: async (prevMenuInfo: MenuRes, request: UpdateMenuReq, token: string) => {

        try {
            const respone = await axiosInstance.patch(`/service-menus/${prevMenuInfo.id}`,
                request, { headers: { 'Authorization': token } });

            return respone.data;
        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "디자이너 정보 수정 중 문제가 발생했습니다.");
            }
            throw e;
        }

    },

    getMenuListByDegisner: async (designerId: number, selectCategory: string):Promise<MenuRes[]> => {

        try {
            const response = await axiosInstance.get<MenuRes[]>(`/auth/designers/${designerId}/service-menus`,
                { params: { category: selectCategory } });

            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "메뉴 데이터를 읽어오는 중 문제가 발생했습니다.");
            }
            throw e;
        }

    },

    getMenuCategoryList: async (): Promise<string[]> => {

        try {
            const response = await axiosInstance.get<string[]>('/auth/menu-categories');
            return response.data;
        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "디자이너 조회 중 문제가 발생했습니다.");
            }
            throw e;
        }

    }
}