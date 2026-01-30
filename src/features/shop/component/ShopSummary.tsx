import { useNavigate } from "react-router";
import type { ShopSummaryResponse } from "../type/response";

export default function ShopSummary({ shop }: { shop: ShopSummaryResponse }) {

    const navigate = useNavigate();

    const shopDetailViewHandler = (s: ShopSummaryResponse) => {
        const navRequest = { pathname: `/shops/detail/${s.id}` };
        navigate(navRequest);
    };

    return (
        <div className="shop-summary-res" key={shop.id} onClick={() => shopDetailViewHandler(shop)}>
            {shop.name}<br />
            {shop.introduction}<br />
            {shop.address}<br />
            {shop.shopStatus}<br />
            {shop.imageList}<br />
        </div>
    )

}