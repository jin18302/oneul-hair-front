import React from "react";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";
import type { ShopTag } from "../../../shop/type/entity";
import { useGetShopTagQuery } from "../../../shop/hook/useShopQuery";



export function SearchTagFilterModal({ closeModal }: { closeModal: () => void; }) {

    console.log("SearchTagFilterModal rendering");

    const { data: tagList } = useGetShopTagQuery();
    const tagAdd = searchConditionStore((s) => s.addTag);

    const tagClickHandler = (s: ShopTag) => tagAdd(s);

    return (
        <>
            <div className="fixed size-full top-0 bottom-0 left-0 right-0 bg-black z-9999 ">
                <div className="bg-white w-125 h-62.5 overflow-y-auto
       border border-[#cccccc] rounded-[20px]
       p-5 fixed z-100
       top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       font-semibold
       shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]">
                    {tagList?.map(t => (<div className="inline-block px-1 py-2 m-1 bg-[#95d6e4] rounded-sm cursor-pointer"
                        key={t.id} onClick={() => tagClickHandler(t)}>{t.name}
                    </div>
                    ))}
                    {/* 요소를 클릭한다면 요소의 클래스 이름을 추가하고, 리스트에 저장한다. */}
                    <button onClick={closeModal}>창 닫기</button>
                    <button onClick={closeModal}>확인</button>
                </div>
            </div>

        </>
    )
}

export default React.memo(SearchTagFilterModal);