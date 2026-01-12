
export interface ShopDetailRes {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    openTime: string;        // LocalTime → 문자열(예: "10:00")
    endTime: string;         // LocalTime → 문자열
    introduction: string;
    imageUrlList: string;
    snsUriList: string[];
    shopTagList: string[];   // List<String> → string[]
    shopStatus: string;      // ShopStatus enum → 우선 string으로 받기
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export const shopDetailInit = {
    id: 0,
    name: "",
    address: "",
    phoneNumber: "",
    openTime: "",        
    endTime: "",        
    introduction: "",
    imageUrlList: "",
    snsUriList: [],
    shopTagList: [], 
    shopStatus: "",      
    createdAt: "",   
    updatedAt: "",    
    deletedAt:  null
}