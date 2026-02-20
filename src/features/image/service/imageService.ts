import { axiosInstance, minioClient } from "../../../common/config/axiosInstance";
import type { PresignedUrlRes } from "../type/response";

export const imageService = {

    getPostPresignedUrl : async(domain: string, imageName: string) => {
        const response = await axiosInstance.post<PresignedUrlRes>(`/auth/images/upload/${domain}/${imageName}`, );
        return response.data;
    },

    getPreviewPresignedUrl : async(imageName: string) => {
        const response = await axiosInstance.get<PresignedUrlRes>(`/auth/images/view`, {params:{"imageName" : imageName}});
        return response.data;
    },

    putImage : async(url: string | undefined, imageFile: File | undefined) => {
         if(!imageFile || !url){return ;}
        const response = await minioClient.put(url, imageFile);
        return response.data;
    }
}