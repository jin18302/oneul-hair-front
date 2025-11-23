import { createContext } from "react";
import type { ShopTag } from "../types/ShopTag";

 interface SearchCondition{

    selectArea: string;
    setSelectArea:(area: string) => void;
    selectTags: ShopTag[];
    tagAdd: (s:ShopTag) => void;

}

export const SearchConditionContext = createContext<SearchCondition | null>(null);

//컨텍스트에서 관리할 데이터타입을 정의하고, 컨텍스트를 반환하는 파일