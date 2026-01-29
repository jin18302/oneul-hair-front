export interface DesignerDetail {
    id: number;
    shopId: number;
    name: string;
    profileImage: string;
    introduction: string;
    imageUrlList: string[];
    snsUrlList: string[];
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