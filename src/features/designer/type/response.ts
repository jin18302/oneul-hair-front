export interface DesignerDetail {
    id: number;
    shopId: number;
    name: string;
    profileImage: string;
    introduction: string;
    imageUrlList: string[];
    snsUrlList: string[];
}

export  interface DesignerSummaryRes {
    id: number,
    profileImage: string,
    name: string,
    introduction: string
}

export const designerDetailInit = 
 {
    id: 0,
    shopId: 0,
    name:"",
    profileImage:"",
    introduction: "",
    imageUrlList: [],
    snsUrlList: []
}

