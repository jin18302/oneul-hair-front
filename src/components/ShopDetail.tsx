import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../AxiosInstance";
import type { ShopDetailRes } from "../types/ShopDetailRes";

export default function ShopDetail() {

    const { shopId } = useParams<{ shopId: string }>();

    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [shopDetail, setShopDetail] = useState<ShopDetailRes>();

    useEffect(() => {

        const shopDetailApiHandler = async () => {
            const response = await axiosInstance.get<ShopDetailRes>(`/shops/${shopId}`);
            setShopDetail(response.data);
        }

        shopDetailApiHandler();
        setIsLoding(false);
    },[]);

    if (isLoding) { return <div>로딩중입니다...</div> }

    return (<>

    {/* TODO: 이미지 처리하기 */}
        <div className="shop-detail-container">
            <div>
                {shopDetail?.name}
                {shopDetail?.address}
                {shopDetail?.phoneNumber}
            </div>

            <div>
                {shopDetail?.introduction}
                {shopDetail?.snsUriList}
            </div>

            <div>
                {shopDetail?.openTime}
                {shopDetail?.endTime}
                {shopDetail?.shopStatus}
            </div>
            <div></div>
        </div>
    </>

    )
}