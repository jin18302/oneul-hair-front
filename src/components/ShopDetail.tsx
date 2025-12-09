import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../AxiosInstance";
import type { ShopDetailRes } from "../types/ShopDetailRes";
import type DesignerSummaryRes from "../types/DesignerSummaryRes";
import "../styles/ShopDetail.css"

export default function ShopDetail() {

    const { shopId } = useParams<{ shopId: string }>();

    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [shopDetail, setShopDetail] = useState<ShopDetailRes>();
    const [designerList, setDesignerList] = useState<DesignerSummaryRes[]>();

    useEffect(() => {

        const shopDetailApiHandler = async () => {
            const response = await axiosInstance.get<ShopDetailRes>(`/shops/${shopId}`);
            setShopDetail(response.data);
        }

        const designerDataApiHandler = async () => {
            console.log("디자이너 리스트 api 호출함");
            const response = await axiosInstance.get<DesignerSummaryRes[]>(`/shops/${shopId}/designers`);
            setDesignerList(response.data);
            console.log(designerList);
        }

        shopDetailApiHandler();
        designerDataApiHandler();
        setIsLoding(false);

    }, []);

    const navigate = useNavigate();
    const designerClickHandler = (d: DesignerSummaryRes) => {navigate(`/designers/${d.id}`);}

    if (isLoding) { return <div>로딩중입니다...</div> ;}

    return (<>

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
                    <div className="designer" onClick={() => designerClickHandler(d)}>
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