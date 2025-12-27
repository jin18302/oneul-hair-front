import { useState } from "react"
// import "../../../styles/FilterArea.css"
import { useSearchConditionContext } from "../../../hooks/UseSearchCondition";
import TagFilterModal from "./TagFilterModal";

export default function TagFilterButton(){

     console.log("TagFilterButton rendering");

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const { selectTags } = useSearchConditionContext();
    const clickHandler = () => setIsShowModal(true);

    return(
        <>
       
              <button className= "filter-button" onClick={clickHandler}> 태그 선택 </button>
              {isShowTagModal && <TagFilterModal closeModal = {() => setIsShowModal(false)} />}
              {selectTags && selectTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
       
        </>
    )

}