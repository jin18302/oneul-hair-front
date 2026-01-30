
import "../../../styles/Modal.css";

import { useEffect, useState } from "react";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";
import { shopSearchService } from "../../service/shopSearchService";
import type { AddrRes } from "../../type/response";

export default function AreaFilterModal({ closeModal }: { closeModal: () => void; }) {

    console.log("AreaFilterModal rendering");

    const [ areaCode, setAreaCode ] = useState<AddrRes | null>(null);
    const [ subAreaList, setSubAreaList ] = useState<AddrRes[]>([]);
    const setSelectArea  = searchConditionStore((s) => s.setSelectArea);

    useEffect(() => {

        const apiHandler = async () => {
            const response = await shopSearchService.getAllAddress(areaCode?.cd);
            setSubAreaList(response);
        };

        apiHandler();

    }, [areaCode]); //페이지가 리렌더링될때마다 api를 불러 상태를 변경하고, 이후에 변경된 리스트를 리렌더링한다.

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