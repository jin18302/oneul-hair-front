import { useMutation } from "@tanstack/react-query";
import { imageService } from "../service/imageService";

export function usePostPresigned() {
    const mutation = useMutation({
        mutationFn: (request: { domain: string, imageName: string }) => {
            return imageService.getPostPresignedUrl(request.domain, request.imageName);
        }
    })
    return mutation;
}

export function useGetPreviewPresigned() {
    const mutation = useMutation({
        mutationFn: (request: { imageName: string }) => {
            return imageService.getPreviewPresignedUrl(request.imageName);
        }
    })
    return mutation;

}

export function usePutImageQuery(){
    const mutation = useMutation({
        mutationFn:(request:{url:string, file: File | undefined}) => {
            return imageService.putImage(request.url, request.file);
        }
    });
    return mutation;
}