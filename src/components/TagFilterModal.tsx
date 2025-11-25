import { useEffect, useState } from "react"
import { axiosInstance } from "../AxiosInstance"
import type { ShopTag } from "../types/ShopTag";
import { useSearchConditionContext } from "../hooks/UseSearchCondition";


export default function SearchTagFilterModal({closeModal}:{closeModal: () => void;}){

    const[tagList, setTagList] = useState<ShopTag[]>([]);
    const {selectTags, tagAdd} = useSearchConditionContext();

    useEffect(() => {
        (   async () => {
            const { data } = await axiosInstance.get<ShopTag[]>('/shop-tags');
            setTagList(data);
        })();
    },[]);

    const tagClickHandler = (s: ShopTag) => {

        if(selectTags.length == 3){
            alert('태그는 최대 3개까지만 선택가능합니다.')
            return;
        }

        tagAdd(s);
        console.log('tag 선택 후 tagList 상태:', selectTags)
    };

    return (
        <>
        <div className="overlay">
            <div className="modal">
            {tagList.map(t => (<div key={t.id} onClick = {() => tagClickHandler(t)}>{t.name}</div>))}
            {/* 요소를 클릭한다면 요소의 클래스 이름을 추가하고, 리스트에 저장한다. */}
                <button onClick={closeModal}>창닫기</button>
                <button onClick={closeModal}>확인</button>
             </div>
        </div>
        
        </>
    )
}