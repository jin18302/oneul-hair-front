import { useState } from "react";
import { useSearchParams } from "react-router";
import ShopSummary from "../../shop/component/ShopSummary";
import { useGetFilteringShop } from "../hook/useShopSearchQuery";


export default function ShopSearchResult() {

    console.log("ShopSearchResult rendering");

    const [searchParams] = useSearchParams();
    const [cursor, setCursor] = useState<string | null>(searchParams.get("lastCursor"));
    
    const { data: searchResult} = useGetFilteringShop({ area: searchParams.get("area"), tagIdList: searchParams.getAll("tagIdList"), lastCursor: cursor });

    const nextPageHandler = () => { setCursor(String(searchResult?.lastCursor)); }

    return (
        <div className="col-start-1 col-end-12 row-start-1 row-end-12 overflow-auto ">
            {searchResult?.content.map(c => <ShopSummary shop={c} />)}
            <button className="next-page-button" onClick={nextPageHandler}>다음 페이지</button>
        </div>
    )
}