import { useNavigate, useParams } from "react-router";
// import "../../styles/ShopDetail.css";
import { useGetDesignerList } from "../../designer/hook/useDesignerQuery";
import type { DesignerSummaryRes } from "../../designer/type/response";
import { useGetShopQuery } from "../hook/useShopQuery";

export default function ShopDetail() {

    console.log("ShopDetail rendering");

    const { shopId } = useParams() as { shopId: string };
    const navigate = useNavigate();

    const {data: shopDetail} = useGetShopQuery(shopId);
    const {data: designerList} = useGetDesignerList(shopId);
 
    const designerClickHandler = (d: DesignerSummaryRes) => { navigate(`/designers/${d.id}`); }

    return ( 

        <div className="shop-detail-container">

            <div className="shop-images">imges</div>

            <div className="shop-information">
                <h2 className="info-element">{shopDetail?.name}</h2>
                <p>{shopDetail.introduction}<br /></p>
                <p>{shopDetail.address}<br /></p>
                <p> {shopDetail.phoneNumber}<br /></p>
                <p> snsUriList: {shopDetail.snsUriList}<br /></p>
                {shopDetail.shopTagIdSet.map(t => 
                    <div key={t.id}>{t.name}</div>)}
                <p>
                    운영상태: {shopDetail.shopStatus}<br />
                    운영시간 : {shopDetail.openTime} ~ {shopDetail?.endTime}<br />
                </p>
            </div>

            <div className="designer-list">
                <h3>designers</h3>
                {designerList && designerList.map(d =>
                    <div key={d.id} className="designer" onClick={() => designerClickHandler(d)}>
                        id:{d.id}<br />
                        image: {d.profileImage}<br />
                        name:{d.name}<br />
                        introduce:{d.introduction}<br />
                    </div>
                )}
            </div>
        </div>
    )
}