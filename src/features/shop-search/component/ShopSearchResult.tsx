import { useState } from "react";
import { useSearchParams } from "react-router";
// import "../../styles/SearchShopView.css";
import ShopSummary from "../../shop/component/ShopSummary";
import { useGetFilteringShop } from "../hook/useShopSearchQuery";


export default function ShopSearchResult() {

    console.log("ShopSearchResult rendering");

    const [searchParams] = useSearchParams();

    const [cursor, setCursor] = useState<string | null>(searchParams.get("lastCursor"));
    const { data: searchResult} = useGetFilteringShop({ area: searchParams.get("area"), tagIdList: searchParams.getAll("tagIdList"), lastCursor: cursor });

    const nextPageHandler = () => { setCursor(String(searchResult?.lastCursor)); }

    return (
        <div className="shop-list-container">
            {searchResult?.content.map(c => <ShopSummary shop={c} />)}
            <button className="next-page-button" onClick={nextPageHandler}>다음 페이지</button>
        </div>
    )
}