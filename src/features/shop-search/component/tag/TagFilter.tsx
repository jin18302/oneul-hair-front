import { useState } from "react"
import "../../../styles/SearchArea.css"
import TagFilterModal from "./TagFilterModal";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";

export default function TagFilter(){

     console.log("TagFilterArea rendering");

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const selectTags = searchConditionStore((s) => s.tagList);
    const clickHandler = () => setIsShowModal(true);

    return(
       <div className="tag-filter-container">
          <button className= "tag-filter-button" onClick={clickHandler}> 태그 선택 </button>
              {isShowTagModal && <TagFilterModal closeModal = {() => setIsShowModal(false)} />}
              {selectTags && selectTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
       </div>
    )

}