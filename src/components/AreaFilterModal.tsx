
import { axiosInstance } from "../AxiosInstance"
import type { AddrRes } from "../types/AddrRes";
import { useEffect, useState } from "react";
import "../styles/Modal.css"

export default function AreaChoicePopup({closeModal, setSelectArea}
    :{closeModal:() => void; setSelectArea:(area: string) => void}) {

    const[areaCode, setAreaCode] = useState<string | null>(null);//areaCode가 바뀔때마다 페이지는 리렌더링된다.
    const[list, setList] = useState<AddrRes[]>([]);
    let isSelectedArea = false;
    // 화면에 렌더링할 지역리스트를 관리

    useEffect(() => {

        if(areaCode == '0' && isSelectedArea || areaCode?.length == 5 ){

        const area = list.find(a => a.cd == areaCode);//사용자가 마지막으로 선택한 지역코드와 일치하는 것을 찾아 fullAddr를 출력한다
        setSelectArea(area?.fullAddress ?? "");
        closeModal();
        return;
        }

        (async () => {
            const { data } = await axiosInstance.get<AddrRes[]>('/address', {params: {code: areaCode}});
            setList(data);
            console.log('setList', list)
        })();

    }, [areaCode]); //페이지가 리렌더링될때마다 api를 불러 상태를 변경하고, 이후에 변경된 리스트를 리렌더링한다.

    const clickHandler = (cd: string) => {setAreaCode(cd); console.log("areaCode 상태 설정:", areaCode);} //지역리스트중 요소를 클릭한다면 areaCode를 변경한다
    const cancelHandler = () => {setAreaCode(null); closeModal();};// 취소버튼을 누르면 areaCode를 리셋하고 창을닫는다.
    const checkHandler = () => {isSelectedArea = true}

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