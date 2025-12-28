import { useState } from "react"
import "../../../styles/SearchArea.css"
import { useSearchConditionContext } from "../../../hooks/UseSearchCondition";
import TagFilterModal from "./TagFilterModal";

export default function TagFilter(){

     console.log("TagFilterButton rendering");

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const { selectTags } = useSearchConditionContext();
    const clickHandler = () => setIsShowModal(true);

    return(
        <>
       
       <div>
          <button className= "area-filter-button" onClick={clickHandler}> 태그 선택 </button>
              {isShowTagModal && <TagFilterModal closeModal = {() => setIsShowModal(false)} />}
              {selectTags && selectTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
              {/* 이 부분을 컴포넌트로 분리 하는것이 좋을 듯 */}
       </div>
        </>
    )

}