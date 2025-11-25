import { useState } from "react"
import TagFilterModal from "./TagFilterModal";
import "../styles/FilterArea.css"
import { useSearchConditionContext } from "../hooks/UseSearchCondition";


export default function TagFilterButton(){

    const [isShowTagModal, setIsShowModal] = useState<boolean>(false);
    const clickHandler = () => setIsShowModal(true);
    const {selectTags} = useSearchConditionContext();

    return(
        <>
       
              <button className= "filter-button" onClick={clickHandler}>태그 선택</button>
              {isShowTagModal && <TagFilterModal closeModal = {() => setIsShowModal(false)} />}
              {selectTags && selectTags.map(t => (<div key={t.id} className="seleted-element">{t.name}</div>))}
       
        </>
    )

}