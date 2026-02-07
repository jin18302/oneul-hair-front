
import { useState } from "react";
// import "../../../styles/Modal.css";
// import "../../../styles/SearchArea.css"
import AreaFilterModal from "./AreaFilterModal";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";


export default function AreaFilter(){

    console.log("AreaFilterArea rendering")
    
    const [ isShowAreaModal, setIsShowAreaModal ] = useState<boolean>(false);
    const selectArea = searchConditionStore((s) => s.selectArea);
    const clickHandler = () => { setIsShowAreaModal(true); }

    return (
      <div className="area-filter-container">
        <button className="area-filter-button" onClick={clickHandler}> 지역선택 </button>
            {isShowAreaModal && <AreaFilterModal closeModal={() => setIsShowAreaModal(false)} />}
            {selectArea && <div className="seleted-element">{ selectArea }</div>}
      </div>
    )
}