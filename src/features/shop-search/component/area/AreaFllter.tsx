
import { useState } from "react";
import AreaFilterModal from "./AreaFilterModal";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";


export default function AreaFilter(){

    console.log("AreaFilterArea rendering")
    
    const [ isShowAreaModal, setIsShowAreaModal ] = useState<boolean>(false);
    const selectArea = searchConditionStore((s) => s.selectArea);
    const clickHandler = () => { setIsShowAreaModal(true); }

    //TODO modal 컴포넌트로 분리
    return (
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 inline-block">
        <button className="bg-[#3298e0]" onClick={clickHandler}> 지역선택 </button>
            {isShowAreaModal && <AreaFilterModal closeModal={() => setIsShowAreaModal(false)} />}
            {selectArea && <div className="inline-block py-1 px-2 m-1 bg-[rgb(163,163,245)] rounded-sm">{ selectArea }</div>}
      </div>
    )
}