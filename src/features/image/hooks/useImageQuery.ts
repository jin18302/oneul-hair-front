import { useMutation } from "@tanstack/react-query";
import { imageService } from "../service/imageService";

export function usePostPresigned() {
    const { mutateAsync } = useMutation({
        mutationFn: (request: { domain: string, imageName: string }) => {
            return imageService.getPostPresignedUrl(request.domain, request.imageName);
        }
    })
    return mutateAsync;
}

export function useGetPreviewPresigned() {
    const { mutateAsync } = useMutation({
        mutationFn: (request: { imageName: string }) => {
            return imageService.getPreviewPresignedUrl(request.imageName);
        }
    })
    return mutateAsync;

}