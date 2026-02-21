import { useNavigate, useParams } from "react-router";
import { useGetDesignerList } from "../../designer/hook/useDesignerQuery";
import type { DesignerSummaryRes } from "../../designer/type/response";
import { useGetShopQuery } from "../hook/useShopQuery";
import ImagePreview from "../../image/components/ImagePreview";

export default function ShopDetail() {

    console.log("ShopDetail rendering");

    const { shopId } = useParams() as { shopId: string };
    const navigate = useNavigate();

    const {data: shopDetail} = useGetShopQuery(shopId);
    const {data: designerList} = useGetDesignerList(shopId);
 
    const designerClickHandler = (d: DesignerSummaryRes) => { navigate(`/designers/${d.id}`); }

    return ( 

        <div className="col-start-1 col-end-12 row-start-1 row-end-12 overflow-auto
        grid grid-cols-12 grid-rows-12 items-start justify-items-start gap-16">

           {shopDetail.mainImage && <ImagePreview image={shopDetail.mainImage}/>
           } 
            <div className="col-start-2 col-end-10 row-start-4 row-end-8">
                <h2>{shopDetail?.name}</h2>
                <p>{shopDetail.introduction}<br /></p>
                <p>{shopDetail.address}<br /></p>
                <p> {shopDetail.phoneNumber}<br /></p>
                <p> snsUriList: {shopDetail.snsUriList}<br /></p>
                {shopDetail.shopTagIdSet.map(t => 
                    <div key={t.id} className="bg-gray-400 rounded-[5px]">{t.name}</div>)}
                <p>
                    운영상태: {shopDetail.shopStatus}<br />
                    운영시간 : {shopDetail.openTime} ~ {shopDetail?.endTime}<br />
                </p>
            </div>

            <div className="col-start-2 col-end-10 row-start-10 row-end-13">
                <h3>designers</h3>
                {designerList && designerList.map(d =>
                    <div key={d.id} className="w-200 border border-b-5 mb-2.5" 
                    onClick={() => designerClickHandler(d)}>
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