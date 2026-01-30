import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { cursorPageResponseInit, type CursorPageResponse } from "../../../types/CursorPageResponse";
import "../../styles/SearchShopView.css";
import type { ShopSummaryResponse } from "../../shop/type/response";
import ShopSummary from "../../shop/component/ShopSummary";
import { shopSearchService } from "../service/shopSearchService";


export default function ShopSearchResult() {

    console.log("ShopSearchResult rendering");

    const [searchParams] = useSearchParams(); 
  
    const [cursor, setCursor] = useState<string | null>(searchParams.get("lastCursor"));
    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [searchResponse, setSearchResponse] = useState<CursorPageResponse<ShopSummaryResponse>>(cursorPageResponseInit);

    useEffect(() => {

        const apiHandler = async () => {

            const area = searchParams.get("area");
            const tagIdList = searchParams.getAll("tagIdList");

            const response = await shopSearchService.getShopListByFiltering(area, tagIdList, cursor);
            setSearchResponse(response);
            setIsLoding(false);
        }

        apiHandler();

    }, [searchParams, cursor]);

    const nextPageHandler = () => {setCursor(String(searchResponse.lastCursor));}

    if (isLoding) { return <div className="loding">로딩 중...</div>}
    return (
            <div className="shop-list-container">
                {!isLoding && searchResponse.content.map(c => <ShopSummary shop = {c}/>)}
                <button className="next-page-button" onClick={nextPageHandler}>다음 페이지</button>
            </div>
    )
}