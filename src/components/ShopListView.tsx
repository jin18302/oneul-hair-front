import { useSearchParams } from "react-router";
import type { CursorPageResponse } from "../types/CursorPageResponse";
import type { ShopSummaryResponse } from "../types/ShopSummaryReponse";
import { useEffect, useState } from "react";
import "../styles/SearchShopView.css"
import { axiosInstance } from "../AxiosInstance";


export default function ShopListView() {

    const [searchParams] = useSearchParams(); //사용자가 선택한 검색조건 파람을 읽어온다.
    const [isLoding, setIsLoding] = useState<boolean>(true);

    const responseInit =
    {
        content: [],
        lastCursor: 0,
        isLastPage: true
    };
    const [searchResponse, setSearchResponse] = useState<CursorPageResponse<ShopSummaryResponse>>(responseInit);
    //검색결과를 저장할 상태 선언

    useEffect(() => {

        console.info("useEffet가 호출되었는가")

        const area = searchParams.get("area");
        const tagIdList = searchParams.getAll("tagIdList").join(",");


        const apiHandler = async () => {//사용자가 선택한 파람을 읽어와 서버로 요청을 보낸다.
            const response = await axiosInstance.get("/shops"
                , { params: { area: area, tagIdList: tagIdList } }
            );

            console.log("response:", response.data);

            setSearchResponse(response.data);//결과를 상태로 저장한다.
            setIsLoding(false);
        }

        apiHandler();

    }, []);



    const { content } = searchResponse;

    if (isLoding) { return <div className="loding">로딩 중...</div>; }

    return (
        <>
                <div className="shop-list-container">
                    {!isLoding && content.map(c =>
                <div className="shop-summary-res" key={c.id}>
                    {c.name}<br />
                    {c.introduction}<br />
                    {c.address}<br />
                    {c.shopStatus}<br />
                    {c.imageList}<br />
                </div>)}
                </div>
        </>
    )


}