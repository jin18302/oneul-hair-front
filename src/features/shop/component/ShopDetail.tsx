import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { ShopDetailState } from "../../../types/ShopDetailState";
import { axiosInstance } from "../../../utils/axiosInstance";
import "../../styles/ShopDetail.css";
import { shopService } from "../service/shopService";
import type { DesignerSummaryRes } from "../../designer/type/response";

export default function ShopDetail() {

    console.log("ShopDetail rendering");

    const { shopId } = useParams<{ shopId: string }>();
    const navigate = useNavigate();
    const dataInit = { shopDetail: null, designerList: [] };

    const [ isLoding, setIsLoding ] = useState<boolean>(true); //서스펜서로 변경 고려
    const [ shopDetailState, setShopDetailState ] = useState<ShopDetailState>(dataInit);
    const { shopDetail, designerList } = shopDetailState;

    useEffect(() => {

        const apiHandler = async () => {

            const shopDetailresponse = await shopService.getShopDetailById(shopId);
            const designerListResponse = await axiosInstance.get<DesignerSummaryRes[]>(`/auth/shops/${shopId}/designers`);

            const data = { shopDetail: shopDetailresponse, designerList: designerListResponse.data};

            setShopDetailState(data);
            setIsLoding(false);
        }
        apiHandler();

    }, [shopId]);

    const designerClickHandler = (d: DesignerSummaryRes) => { navigate(`/designers/${d.id}`); }

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

            <div className="shop-information">
                <h2 className="info-element">{shopDetail?.name}</h2>
                <p>{shopDetail?.introduction}<br /></p>
                <p>{shopDetail?.address}<br /></p>
                <p> {shopDetail?.phoneNumber}<br /></p>
                {/* <p> snsUriList: {shopDetail?.snsUriList}<br /></p> */}
                <p>
                    운영상태: {shopDetail?.shopStatus}<br />
                    운영시간 : {shopDetail?.openTime} ~ {shopDetail?.endTime}<br />
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

    </>

    )
}