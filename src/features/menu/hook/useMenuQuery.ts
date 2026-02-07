import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { menuService } from "../service/menuService";
import type { CreateMenuReq, UpdateMenuReq } from "../type/request";

export function useCreateMenuQuery() {
    const mutation = useMutation({
        mutationFn:  (request: { designerId: string, body: CreateMenuReq[] }) => {
         return   menuService.createMenu(request.designerId, request.body);
        }
    });
    return mutation;
}

export function useUpdateMenuQuery() {
    const mutation = useMutation({
        mutationFn:  (request: { menuId: number, body: UpdateMenuReq }) => {
          return menuService.updateMenu(request.menuId, request.body);
        }
    });
    return mutation;

}

export function useGetDesignerMenusQuery(designerId: string,  selectCategory: string) {
    const { data, isLoading } = useSuspenseQuery({
        queryKey: ['designer', designerId, 'menuList'],
        queryFn: async () => {
           return menuService.getDesignerMenuList(designerId, selectCategory);
        }
    });
    return { data, isLoading };
}

export function useGetCategoriesQuery(){

     const { data } = useSuspenseQuery({
        queryKey: ['menu-categoryList'],
        queryFn:  () => {return menuService.getMenuCategoryList();}
    });
    return { data };

}