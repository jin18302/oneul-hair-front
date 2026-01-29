import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "../../styles/SearchShopView.css";
import { shopService } from "../service/shopService";
import type { CursorPageResponse } from "../../../types/CursorPageResponse";
import type { ShopSummaryResponse } from "../../../types/ShopSummaryReponse";


export default function ShopListView() {

    console.log("ShopListView rendering");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); //사용자가 선택한 검색조건 파람을 읽어온다.
    const responseInit = { content: [], lastCursor: 0, isLastPage: true };

    const [cursor, setCursor] = useState<string | null>(searchParams.get("lastCursor"));
    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [searchResponse, setSearchResponse] = useState<CursorPageResponse<ShopSummaryResponse>>(responseInit);

    useEffect(() => {

        const apiHandler = async () => {//사용자가 선택한 파람을 읽어와 서버로 요청을 보낸다.

            const area = searchParams.get("area");
            const tagIdList = searchParams.getAll("tagIdList");

            const response = await shopService.getShopListByFiltering(area,tagIdList,cursor)
            setSearchResponse(response);//결과를 상태로 저장한다.
            setIsLoding(false);
        }

        apiHandler();

    }, [searchParams, cursor]);


    //handler
    
    const shopDetailViewHandler = (s: ShopSummaryResponse) => {
        const navRequest = { pathname: `/shops/detail/${s.id}` };
        navigate(navRequest);
    }

    const nextPageHandler = () => {setCursor(String(searchResponse.lastCursor));}

    if (isLoding) { return <div className="loding">로딩 중...</div>}
    return (
        <>
            <div className="shop-list-container">
                {!isLoding && searchResponse.content.map(c =>
                    <div className="shop-summary-res" key={c.id} onClick={() => shopDetailViewHandler(c)}>
                        {c.name}<br />
                        {c.introduction}<br />
                        {c.address}<br />
                        {c.shopStatus}<br />
                        {c.imageList}<br />
                    </div>
                )}
                <button className="next-page-button" onClick={nextPageHandler}>다음 페이지</button>
            </div>
        </>
    )
}