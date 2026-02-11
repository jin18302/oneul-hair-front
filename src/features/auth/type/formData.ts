
export interface OwnerSignUpData {
    userRole:string;
    name: string;
    businessId: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    gender: string | null;
    openTime: string;
    endTime: string;
    introduction: string;
    snsUriList: string;
    shopTagIdSet: number[];
    mainImage: File | undefined
}

export const ownerSignUpDataInit = {
    userRole: "OWNER",
    name: "",
    businessId: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    gender:null,
    openTime: "",
    endTime: "",
    introduction: "",
    snsUriList: "",
    shopTagIdSet: [],
    mainImage: undefined
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string | null;
  userRole: string;
  profileImage: File | null
}

export const userSignupReqInit = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "",
  userRole: "CUSTOMER",
  profileImage: null
}