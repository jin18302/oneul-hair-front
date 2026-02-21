import { useParams } from "react-router";
import DesignerSummary from "../../features/designer/component/DesignerSummary";
import { useGetDesignerList } from "../../features/designer/hook/useDesignerQuery";
import ShopDetail from "../../features/shop/component/ShopDetail";

export default function ShopDetailPage() {
    console.log("ShopDetailPAge rendering");

    const { shopId } = useParams() as { shopId: string };
    const { data: designerList } = useGetDesignerList(shopId);



    return (
        <>
            <ShopDetail id={shopId} />
            <div className="col-start-2 col-end-12 row-start-5 row-end-12">
                <h3>designers</h3>
                {designerList.map(d => <DesignerSummary data={d} />)}
            </div>
        </>


    )
}