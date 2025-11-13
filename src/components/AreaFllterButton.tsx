import { useState } from "react"
import AreaChoicePopup from "./AreaFilterModal";
import "../styles/Modal.css"
import "../styles/FilterArea.css"

export default function AreaFilterButton({ selectArea, setSelectArea }: { selectArea: string | null; setSelectArea: (area: string) => void; }) {

    const [isShowModal, setIsModal] = useState(false);
    //isShow가 true라면 팝업 창을 띄운다.

    const clickHandler = () => { setIsModal(true); }
    //사용자가 버튼 클릭시 isShow를 true로 바꾼다. 그러면 하위 컴포넌트가 호출될것

    console.log('selectArea:', selectArea);

    return (

        <>
            <button className="filter-button" onClick={clickHandler}> 지역선택 </button>
            {isShowModal && <AreaChoicePopup setSelectArea={setSelectArea} closeModal={() => setIsModal(false)} />}
            {selectArea && <div className="seleted-element">{selectArea}</div>}
        </>
    )
}