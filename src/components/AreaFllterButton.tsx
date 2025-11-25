import AreaChoicePopup from "./AreaFilterModal";
import "../styles/Modal.css"
import "../styles/FilterArea.css"
import { useSearchConditionContext } from "../hooks/UseSearchCondition";
import { useState } from "react";

export default function AreaFilterButton(){
    
    const [isShowModal, setIsModal] = useState(false);
    //isShow가 true라면 팝업 창을 띄운다.
    const {selectArea} = useSearchConditionContext();

    const clickHandler = () => { setIsModal(true); }
    //사용자가 버튼 클릭시 isShow를 true로 바꾼다. 그러면 하위 컴포넌트가 호출될것

    return (

        <>
            <button className="filter-button" onClick={clickHandler}> 지역선택 </button>
            {isShowModal && <AreaChoicePopup closeModal={() => setIsModal(false)} />}
            {selectArea && <div className="seleted-element">{selectArea}</div>}
        </>
    )
}

