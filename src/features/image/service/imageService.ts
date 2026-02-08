import { axiosInstance } from "../../../common/config/axiosInstance"
import type { PresignedUrlRes } from "../type/response"

export const imageService = {

    getPostPresignedUrl : async(domain: string, imageName: string) => {
        const response = await axiosInstance.get<PresignedUrlRes>(`/images/upload/${domain}/${imageName}`);
        return response.data;
    },

    getPreviewPresignedUrl : async(imageName: string) => {
        const response = await axiosInstance.get<PresignedUrlRes>(`/images/view/${imageName}`);
        return response.data;
    }
}