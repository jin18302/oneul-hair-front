import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { imageService } from "../service/imageService";

export function usePostPresigned() {
    const mutation = useMutation({
        mutationFn: (request: { domain: string, imageName: string }) => {
            return imageService.getPostPresignedUrl(request.domain, request.imageName);
        }
    })
    return mutation;
}

export function useGetPreviewPresigned(imageName: string) {
    const {data}= useSuspenseQuery({
        queryKey:["image", imageName],
        queryFn: () => {
            return imageService.getPreviewPresignedUrl(imageName);
        }
    })
    return {data};

}

export function usePutImageQuery(){
    const mutation = useMutation({
        mutationFn:(request:{url:string, file: File | undefined}) => {
            return imageService.putImage(request.url, request.file);
        }
    });
    return mutation;
}