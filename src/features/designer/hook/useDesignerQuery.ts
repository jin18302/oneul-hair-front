import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { designerService } from "../service/designerService";
import type { CreateDesignerReq, UpdateDesignerReq } from "../type/request";

export function useCreateDesigner() {
    const mutation = useMutation({
        mutationFn: (request: CreateDesignerReq) => {
            return designerService.createDesigner(request)
        }
    });
    return mutation;
}

export function useGetDesignerInfo(designerId: string) {
    const { data } = useSuspenseQuery({
        queryKey: ['designerInfo', designerId],
        queryFn: () => { return designerService.readDesigner(designerId) },
    });
    return { data };
}

export function useUpdateDesigner() {
    const mutation = useMutation({
        mutationFn: (request: { designerId: string, body: UpdateDesignerReq }) => {
            return designerService.updateDesigner(request.designerId, request.body)
        }
    });
    return mutation;
}

export function useGetDesignerList(shopId: string) { //TODO

    const { data, isLoading } = useSuspenseQuery({
        queryKey: ['shop', shopId, 'designerList'],
        queryFn: () => {
          return  designerService.getDesignerListByShop(shopId);
        },
    });
    return { data, isLoading };

}

export function useGetMyDesignerList() {
    const { data } = useSuspenseQuery({
        queryKey: ['my', "designer-list"],
        queryFn: () => { return designerService.getMyDesignerList() },
    });
    return { data };

}