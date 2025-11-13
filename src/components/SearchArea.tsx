import { useState } from "react";
import AreaFilterButton from "./AreaFllterButton";
import "../styles/SearchArea.css";
import type { ShopTag } from "../types/ShopTag";
import "../styles/FilterArea.css";
import TagFilterButton from "./TagFilterButton";



export default function SearchArea() {

    const [selectArea, setSelectArea] = useState<string | null>(null);
    const [selectTags, setSelectags] = useState<ShopTag[]>([]);


    //TODO: 내부 비즈니스 로직 해결
    const searchHandler = async () => {

        //selectArea와 selectTags를 가지고 서버로 요청을 보낸다.
        //서버가 반환한 값을 가지고 새로운페이지로 이동하여 렌더링한다.

    }

    return (

            <div className="search-container">
                <div className="search"></div>
                <AreaFilterButton selectArea={selectArea} setSelectArea={setSelectArea} />
                <TagFilterButton
                    selectTags={selectTags} setSelectTags={(s: ShopTag) => setSelectags((prev => [...prev, s]))} />
                <button id="search-button" onClick={searchHandler}>검색</button>
            </div>
    )
}