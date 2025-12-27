
import { useState } from "react";
import { useSearchConditionContext } from "../../../hooks/UseSearchCondition";
import "../../../styles/FilterArea.css";
import "../../../styles/Modal.css";
import AreaFilterModal from "./AreaFilterModal";


export default function AreaFilterButton(){

    console.log("AreaFilterButton rendering")
    
    const [isShowModal, setIsModal] = useState(false);
    const { selectArea } = useSearchConditionContext();
    const clickHandler = () => { setIsModal(true); }

    return (

        <>
            <button className="filter-button" onClick={clickHandler}> 지역선택 </button>
            {isShowModal && <AreaFilterModal closeModal={() => setIsModal(false)} />}
            {selectArea && <div className="seleted-element">{selectArea}</div>}
        </>
    )
}

