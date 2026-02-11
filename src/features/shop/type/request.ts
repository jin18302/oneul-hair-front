import type { SignupRequest } from "../../auth/type/request";


export interface CreateShopReq {
    // Java의 Long은 JS에서 number로 대응
    name: string;
    mainImage: string | undefined;
    businessId: string;
    address: string;
    phoneNumber: string;
    openTime: string;
    endTime: string;
    introduction: string;
    snsUriList: string[];
    shopTagIdSet: number[];
    ownerSignUpRequest: SignupRequest;
}

export interface UpdateShopReq {
    name: string;
    address: string;
    phoneNumber: string;
    openTime: string;
    endTime: string;
    introduction: string;
    snsUriList: string[];
    shopTagIdSet: number[];
}