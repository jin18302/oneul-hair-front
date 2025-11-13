import { useState } from "react"
import TagFilterModal from "./TagFilterModal";
import type { ShopTag } from "../types/ShopTag";
import "../styles/FilterArea.css"


export default function TagFilterButton({selectTags, setSelectTags}:{
    selectTags:ShopTag[]; setSelectTags:(s:ShopTag) => void
}){

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const clickHandler = () => setIsShowModal(true);

    return(
        <>
       
              <button className= "filter-button" onClick={clickHandler}>태그 선택</button>
              {isShowTagModal && <TagFilterModal 
              closeModal = {() => setIsShowModal(false)} 
              selectedTags = {selectTags} setSelectTags = {(s:ShopTag) => setSelectTags(s)}/>}
              {selectTags && selectTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
       
        </>
    )

}