
// import "../../../styles/Modal.css";

import { useState } from "react";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";
import { useGetAddressQuery } from "../../service/shopSearchService";
import type { AddrRes } from "../../type/response";

export default function AreaFilterModal({ closeModal }: { closeModal: () => void; }) {

    console.log("AreaFilterModal rendering");

    const [ areaCode, setAreaCode ] = useState<AddrRes | null>(null);
   const {data: subAreaList, isLoading} = useGetAddressQuery(areaCode?.cd ?? "");
    const setSelectArea  = searchConditionStore((s) => s.setSelectArea);

    const clickHandler = (area: AddrRes) => {

        if (area.cd != '0') { //만약 [전체]요소를 클릭한다면 이전 클릭요소를 가지고와 서버로 요청을 보낸다.
            setAreaCode(area);
            return;
        } 
            setSelectArea(areaCode?.fullAddress??"");
            closeModal();
            return;
    };

    const cancelHandler = () => { setAreaCode(null); closeModal(); };

    if(isLoading){return <div>Loading...</div>}

    return (
        <div className="overlay">
            <div className="modal">
                {subAreaList && subAreaList.map(r => (
                    <div className="element" key={r.cd} onClick={() => clickHandler(r)}>{r.address}</div>)
                )}
                <button onClick={() => cancelHandler()}>취소</button>
            </div>
        </div>
    );
}