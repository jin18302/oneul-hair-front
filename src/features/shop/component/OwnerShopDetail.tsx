import { useNavigate } from "react-router";
import { useGetMyShopQuery } from "../hook/useShopQuery";
import ImagePreview from "../../image/components/ImagePreview";


export default function OwnerShopDetail() {

    console.log("ownerShopDetail rendering");

    const navigator = useNavigate();
    const { data: shopDetail } = useGetMyShopQuery();

    console.log("shopDetail", shopDetail)

    return (
        <div className="shop-detail-container">
            <ImagePreview image={shopDetail.mainImage}/>
            <h2 className="info-element">{shopDetail.name}</h2>
            <p>{shopDetail.introduction}<br /></p>
            <p>{shopDetail.address}<br /></p>
            <p> {shopDetail?.phoneNumber}<br /></p>
            <p> snsUriList: {shopDetail?.snsUriList}<br /></p>
            {shopDetail.shopTagIdSet.map(t =>
                <div key={t.id}>{t.name}</div>)}

            <p>
                운영상태: {shopDetail?.shopStatus}<br />
                운영시간 : {shopDetail?.openTime} ~ {shopDetail?.endTime}<br />
            </p>

            <p>{shopDetail.createdAt}</p>
            <p>{shopDetail.updatedAt}</p>
            <p>{shopDetail.deletedAt}</p>

            <button onClick={() => navigator(`/shops/${shopDetail?.id}/edit`)}>수정</button>
        </div>
    )
}