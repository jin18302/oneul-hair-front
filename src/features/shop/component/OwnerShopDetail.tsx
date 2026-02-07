import { useNavigate } from "react-router";
import { useGetShopQuery } from "../service/shopService";

export default function OwnerShopDetail(){

    console.log("ownerShopDetail rendering");

    const navigator = useNavigate();
    const {data: shopDetail} = useGetShopQuery("");

    return ( 
        <div className="shop-detail-container">
            <div className="shop-images">imges</div>
                <h2 className="info-element">{shopDetail?.name}</h2>
                <p>{shopDetail.introduction}<br /></p>
                <p>{shopDetail.address}<br /></p>
                <p> {shopDetail?.phoneNumber}<br /></p>
                <p> snsUriList: {shopDetail?.snsUriList}<br /></p>
                <p>{shopDetail.imageUrlList}</p>
                <p>{shopDetail.shopTagList}</p>

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