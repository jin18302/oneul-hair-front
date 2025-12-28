
import { useState } from "react";
import { useSearchConditionContext } from "../../../hooks/UseSearchCondition";
import "../../../styles/Modal.css";
import "../../../styles/SearchArea.css"
import AreaFilterModal from "./AreaFilterModal";


export default function AreaFilter(){

    console.log("AreaFilterButton rendering")
    
    const [ isShowModal, setIsModal ] = useState(false);
    const { selectArea } = useSearchConditionContext();
    const clickHandler = () => { setIsModal(true); }

    return (

        <>
            <button className="tag-filter-button" onClick={clickHandler}> 지역선택 </button>
            {isShowModal && <AreaFilterModal closeModal={() => setIsModal(false)} />}
            {selectArea && <div className="seleted-element">{ selectArea }</div>}
        </>
    )
}