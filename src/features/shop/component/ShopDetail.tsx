import ImagePreview from "../../image/components/ImagePreview";
import { useGetShopQuery } from "../hook/useShopQuery";

export default function ShopDetail({id}:{id:string}) {

    console.log("ShopDetail rendering");
     const {data: shopDetail} = useGetShopQuery(id);

 
    

    return ( 
          
            <div className="col-start-2 col-end-10 row-start-1 row-end-4 border border-black">
                 {shopDetail.mainImage && <ImagePreview image={shopDetail.mainImage}/>} 
                <h1 className="text-4xl">{shopDetail.name}</h1> <br/>
                <p>{shopDetail.introduction}</p> <br/>
                <p>{shopDetail.address}</p><br />
                <p> {shopDetail.phoneNumber}</p><br />
               <a></a>
               {/* TODO: snsurl적용하기 */}
                {shopDetail.shopTagIdSet.map(t => 
                    <div key={t.id} className="bg-gray-400 rounded-[5px]">{t.name}</div>)}
                <p>
                    운영상태: {shopDetail.shopStatus}<br />
                    운영시간 : {shopDetail.openTime} ~ {shopDetail?.endTime}<br />
                </p>
            </div>
    )
}