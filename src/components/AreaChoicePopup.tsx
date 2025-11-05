
import { axiosInstance } from "../AxiosInstance"
import type { AddrRes } from "../types/AddrRes";
import { useEffect, useState } from "react";
import "../styles/Modal.css"

export default function AreaChoicePopup({closeModal, setSelectArea}
    :{closeModal:() => void; setSelectArea:(area: string) => void}) {

    const[areaCode, setAreaCode] = useState<string | null>(null);
    const[list, setList] = useState<AddrRes[]>([]);
    // 화면에 렌더링할 지역리스트를 관리

    useEffect(() => {
        (async () => {
            const { data } = await axiosInstance.get<AddrRes[]>('/address', {params: {code: areaCode}});
            setList(data);
        })();
    }, [areaCode]); //사용자가 지역을 선택하면 코드를 바꿀것이고, 그 코드가 바뀔때마다 api를 요청하여 다음 단계의 지역리스트를 읽어온다.


    const clickHandler = (cd: string) =>{setAreaCode(cd)}
    const cancelHandler = () => {setAreaCode(null); closeModal();};
    const checkHandler = () => {
        const area = list.find(a => a.cd == areaCode);
        setSelectArea(area?.fullAddress ?? "");
        closeModal();
    }

    return (
        <div className="overlay">
            <div className="modal">
                {list.map(r => (
                    <div className="element" key={r.cd} onClick={() => clickHandler(r.cd)}>{r.address}</div>
                ))}
                <button onClick={cancelHandler}>취소</button>
                <button onClick={checkHandler}>확인</button>
            </div>
        </div>
    );
}