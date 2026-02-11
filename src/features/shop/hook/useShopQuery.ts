import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { shopService } from "../service/shopService";
import type { UpdateShopReq } from "../type/request";



export function useUpdateShopQuery(){
    const mutate = useMutation({
        mutationFn : (request:{shopId:number, body: UpdateShopReq}) => {
            return shopService.updateShop(request.shopId, request.body);
        }
    });
    return mutate;
}

export function useGetShopTagQuery() {
    const { data } = useSuspenseQuery({
        queryKey: ["shop-tag"],
        queryFn:  () => { return shopService.getShopTagList();}
    });
    return { data };
}

export function useGetShopQuery(shopId: string) {
    const { data } = useSuspenseQuery({
        queryKey: ["shop", shopId],
        queryFn: () => {
          return shopService.getShop(shopId);
        }
    });
    return { data };
}

export function useGetMyShopQuery(){

     const { data } = useSuspenseQuery({
        queryKey: ["my-shop"],
        queryFn: () => {
          return shopService.getMyShop();
        }
    });
    return { data };

}