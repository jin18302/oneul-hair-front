import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../AxiosInstance";
import type { ShopDetailRes } from "../types/ShopDetailRes";
import type DesignerSummaryRes from "../types/DesignerSummaryRes";

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

        const designerDataApiHandler = async() => {
            console.log("디자이너 api 호출함");
            const response = await axiosInstance.get<DesignerSummaryRes[]>(`/shops/${shopId}/designers`);
            setDesignerList(response.data);
            console.log(designerList);
        }
    
        shopDetailApiHandler();
        designerDataApiHandler();
        setIsLoding(false);

    },[]);

    if (isLoding) { return <div>로딩중입니다...</div> }

    return (<>

    {/* TODO: 이미지 처리하기 */}
        <div className="shop-detail-container">

            <div className="shop-detail">
                name: {shopDetail?.name}<br/>
                address: {shopDetail?.address}<br/>
                phoneNumber: {shopDetail?.phoneNumber}<br/>
                introduction: {shopDetail?.introduction}<br/>
                snsUriList: {shopDetail?.snsUriList}<br/>
                openTime: {shopDetail?.openTime}<br/>
                endTime:{shopDetail?.endTime}<br/>
                shopStatus: {shopDetail?.shopStatus}<br/>
            </div>

            <div className="designer-list">
                {designerList && designerList.map(d => 
                    <div>
                        id:{d.id}<br/>
                        image: {d.profileImage}<br/>
                        name:{d.name}<br/>
                        introduce:{d.introduction}<br/>
                    </div>
                )}

            </div>
        </div>
    </>

    )
}