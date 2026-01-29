import type { UserSignupRequest } from "../../auth/type/request";

export interface CreateShopReq {
    // Java의 Long은 JS에서 number로 대응
    name: string;
    businessId: string;
    address: string;
    phoneNumber: string;
    openTime: string;
    endTime: string;
    introduction: string;
    snsUriList: string[];
    shopTagList: number[];
    ownerSignUpRequest: UserSignupRequest;
    }