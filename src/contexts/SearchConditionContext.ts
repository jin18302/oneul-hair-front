import { createContext } from "react";
import type { ShopTag } from "../types/ShopTag";

 interface SearchCondition{
    selectArea: string;
    setSelectArea:(area: string) => void;
    selectTags: ShopTag[];
    tagAdd: (s:ShopTag) => void;
}

export const SearchConditionContext = createContext<SearchCondition | null>(null);