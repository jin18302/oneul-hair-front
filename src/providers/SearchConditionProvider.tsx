import { useState } from "react";
import type { ShopTag } from "../types/ShopTag";
import { SearchConditionContext } from "../contexts/SearchConditionContext";

export default function SearchConditionProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [selectArea, setSelectArea] = useState<string>("전체");
  const [selectTags, setSelectags] = useState<ShopTag[]>([]);

  const tagAdd = (s: ShopTag) => { setSelectags(prev => [...prev, s]); };

  return (
    <>
      <SearchConditionContext.Provider value={{ selectArea, setSelectArea, selectTags, tagAdd }}>
        {children}
      </SearchConditionContext.Provider>
    </>
  );
}


