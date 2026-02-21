import { useNavigate } from "react-router";
import type { ShopSummaryResponse } from "../type/response";

export default function ShopSummary({ shop }: { shop: ShopSummaryResponse }) {

    const navigate = useNavigate();

    const shopDetailViewHandler = (s: ShopSummaryResponse) => {
        const navRequest = { pathname: `/shops/detail/${s.id}` };
        navigate(navRequest);
    };

    return (
        <div className="w-200 h-37.5 text-[15px] border border-black" 
        key={shop.id} onClick={() => shopDetailViewHandler(shop)}>
            {shop.name}<br />
            {shop.introduction}<br />
            {shop.address}<br />
            {shop.shopStatus}<br />
            {/* {shop.mainImage}<br /> */}
        </div>
    )

}