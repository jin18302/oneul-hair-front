import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { shopDetailInit, type ShopDetailRes } from "../../../types/ShopDetailRes";
import { getAccessToken } from "../../../utils/tokenmanager";
import { shopService } from "../service/shopService";

export default function OwnerShopDetail(){

    console.log("ownerShopDetail rendering");

    const navigator = useNavigate();

    const [shopDetail, setShopDetail] = useState<ShopDetailRes>(shopDetailInit);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async() => {

            const response = await shopService.getShopDetailByOwner(getAccessToken());
            
            setShopDetail(response);
            setIsLoding(false);
        }

        apiHandler();
    },[]);

     if (isLoding) { return <div>로딩중입니다...</div>; }

    return ( <>

        {/* 
        TODO: 
        -이미지 처리
        -이모티콘 처리
        -링크처리
         */}


        <div className="shop-detail-container">

            <div className="shop-images">imges</div>

                <h2 className="info-element">{shopDetail?.name}</h2>
                <p>{shopDetail?.introduction}<br /></p>
                <p>{shopDetail?.address}<br /></p>
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

                <button onClick={() => navigator(`/shops/${shopDetail.id}/edit`)}>수정</button>
    
            </div>

    </>

    )
}