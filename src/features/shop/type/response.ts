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

export const shopDetailInit = { // TODO: 이것을 파일을 따로 뺄지 고민
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

export interface ShopSummaryResponse{
    id: number;
    name: string;
    introduction: string;
    address: string;
    shopStatus: string;
    imageList: string[];
}