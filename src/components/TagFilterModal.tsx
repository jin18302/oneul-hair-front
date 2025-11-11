import { useEffect, useState } from "react"
import { axiosInstance } from "../AxiosInstance"
import type { ShopTag } from "../types/ShopTag";


export default function SearchTagFilterModal({closeModal, selectedTags, setSelectTags}
    :{closeModal: () => void; selectedTags:ShopTag[];  setSelectTags:(s:ShopTag) => void}){

    const[tagList, setTagList] = useState<ShopTag[]>([]);
    console.log("tagList 초기값:", selectedTags)

    // 백엔드 api를 호출해서 태그리스트를 불러온다.
    // 사용자는 태그를 1 개 이상 3개 이하 선택할 수 있으며, 한번 누르면 선택 2번누르면 선택이 취소된다.
    // 선택한 태그는 백그라운드 컬러가 진하게 변경되도록 할것.
    // 확인을 누르면 사용자가 선택한 값들을 리스트에 저장하고 창을 닫고, 부모 컴포넌트에서 리스트를 렌더링한다. 

    useEffect(() => {
        (   async () => {
            const { data } = await axiosInstance.get<ShopTag[]>('/shop-tags');
            setTagList(data);
        })();
    },[]);

    const tagClickHandler = (s: ShopTag) => {

        if(selectedTags.length == 3){
            alert('태그는 최대 3개까지만 선택가능합니다.')
            return;
        }

        setSelectTags(s);
        console.log('tag 선택 후 tagList 상태:', selectedTags)
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