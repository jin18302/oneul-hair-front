import type { CreateShopReq } from "../../shop/type/request";
import type { OwnerSignUpData, SignupData } from "../type/formData";
import type { SignupRequest } from "../type/request";

export const requestMapper = {

    toOwnerSignUpReq: (data: OwnerSignUpData, image: string | undefined): CreateShopReq => {

        return {
            name: data.name,
            mainImage: image,
            businessId: data.businessId,
            address: data.address,
            phoneNumber: data.phoneNumber,
            openTime: data.openTime,
            endTime: data.endTime,
            introduction: data.introduction,
            snsUriList: data.snsUriList.split(","),
            shopTagIdSet: data.shopTagIdSet,
            ownerSignUpRequest: {
                name: data.name,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                userRole: data.userRole,
                profileImage: null
            }
        }
    },
    toUserSignupReq:(formData: SignupData, image:string | null):SignupRequest =>{
        return {
            name: formData.name,
            profileImage: image,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            userRole: formData.userRole
        }
    }
}