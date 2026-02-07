
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { CreateMenuReq, UpdateMenuReq } from "../type/request";
import type { MenuRes } from "../type/response";

export const menuService = {
    
    createMenu: async (designerId: string, requestBody: CreateMenuReq[]) => {
        const response = await axiosInstance.post(`/designers/${designerId}/service-menus`, requestBody);
        return response.data;
    },
    updateMenu: async (menuId: number, requestBody: UpdateMenuReq) => {
        const response = await axiosInstance.patch(`/service-menus/${menuId}`, requestBody);
        return response.data;
    },
    getDesignerMenuList: async (designerId: string, selectCategory: string) => {
        const response = await axiosInstance.get<MenuRes[]>(`/auth/designers/${designerId}/service-menus`,
            { params: { category: selectCategory } });
        return response.data;
    },
    getMenuCategoryList: async () => {
        const response = await axiosInstance.get<string[]>('/auth/menu-categories');
        return response.data;
    }

}