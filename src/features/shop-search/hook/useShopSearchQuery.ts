import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { shopSearchService } from "../service/shopSearchService";

export function useGetAddressQuery(areaCode: string) {

    const {data, isLoading} = useQuery({
        queryKey:["address", areaCode],
        queryFn:  () => {
            return shopSearchService.getAddress(areaCode);
        }
    });
    return {data, isLoading};
}

export function useGetFilteringShop(request:{area: string | null, tagIdList: string[], lastCursor: string | null}){
     const {data, isLoading} = useSuspenseQuery({
        queryKey:['area', request.area, 'tagList', request.tagIdList, 'cursor', request.lastCursor],
        queryFn:  () => {
            return shopSearchService.getFilteringShop(request.area, request.tagIdList, request.lastCursor);
        }
    });
    return {data, isLoading};
}