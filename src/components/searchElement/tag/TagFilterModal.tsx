import { useEffect, useState } from "react"
import { axiosInstance } from "../../../AxiosInstance";
import type { ShopTag } from "../../../types/ShopTag";
import React from "react";
import { searchConditionStore } from "../../../contexts/searchConditionStore";



export function SearchTagFilterModal({closeModal}:{closeModal: () => void;}){

    console.log("SearchTagFilterModal rendering");

    const[tagList, setTagList] = useState<ShopTag[]>([]);
    const tagAdd = searchConditionStore((s) => s.addTag);

    useEffect(() => {

        const apiHandler =  async () => {
            const { data } = await axiosInstance.get<ShopTag[]>('/auth/shop-tags');
            setTagList(data);
        };

        apiHandler();
    },[]);

    const tagClickHandler = (s: ShopTag) => tagAdd(s);

    return (
        <>
        <div className="overlay">
            <div className="modal">
            {tagList.map(t => (<div className="element" key={t.id} onClick = {() => tagClickHandler(t)}>{t.name}</div>))}
            {/* 요소를 클릭한다면 요소의 클래스 이름을 추가하고, 리스트에 저장한다. */}
                <button onClick={closeModal}>창 닫기</button>
                <button onClick={closeModal}>확인</button>
             </div>
        </div>
        
        </>
    )
}

 export default React.memo(SearchTagFilterModal);