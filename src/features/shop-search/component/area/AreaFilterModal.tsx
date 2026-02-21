
import { useState } from "react";
import { searchConditionStore } from "../../../../contexts/searchConditionStore";
import type { AddrRes } from "../../type/response";
import { useGetAddressQuery } from "../../hook/useShopSearchQuery";

export default function AreaFilterModal({ closeModal }: { closeModal: () => void; }) {

    console.log("AreaFilterModal rendering");

    const [areaCode, setAreaCode] = useState<AddrRes | null>(null);
    const { data: subAreaList, isLoading } = useGetAddressQuery(areaCode?.cd ?? "");
    const setSelectArea = searchConditionStore((s) => s.setSelectArea);

    const clickHandler = (area: AddrRes) => {

        if (area.cd != '0') { //만약 [전체]요소를 클릭한다면 이전 클릭요소를 가지고와 서버로 요청을 보낸다.
            setAreaCode(area);
            return;
        }
        setSelectArea(areaCode?.fullAddress ?? "");
        closeModal();
        return;
    };

    const cancelHandler = () => { setAreaCode(null); closeModal(); };

    if (isLoading) { return <div>Loading...</div> }

    return (
        <div className="fixed size-full top-0 bottom-0 left-0 right-0 bg-black z-9999 ">
            <div className="bg-white w-125 h-62.5 overflow-y-auto
       border border-[#cccccc] rounded-[20px]
       p-5 fixed z-100
       top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       font-semibold
       shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]">
                {subAreaList && subAreaList.map(r => (
                    <div className="inline-block px-1 py-2 m-1 bg-[#95d6e4] rounded-sm cursor-pointer"
                        key={r.cd} onClick={() => clickHandler(r)}>
                        {r.address}
                    </div>
                )
                )}
                <button onClick={() => cancelHandler()}>취소</button>
            </div>
        </div>
    );
}

