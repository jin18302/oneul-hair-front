import { useEffect, useState } from "react"
import "../../../styles/ReservationHistories.css"
import { axiosInstance } from "../../utils/axiosInstance";
import type { CursorPageResponse } from "../../types/CursorPageResponse";
import { getAccessToken } from "../../utils/tokenmanager";
import type { ReservationRes } from "../../features/reservation/type/response";

export default function ReservationHistories(){

    console.log("ReservationHistories rendering");

    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [reservationList, setReservationList] = useState<CursorPageResponse<ReservationRes>>();

    useEffect(() => {

        const apiHandler = async() => {
            
            const response = await axiosInstance.get<CursorPageResponse<ReservationRes>>('/reservations',
                {  headers: { 'Authorization': getAccessToken() } }
            );

            setReservationList(response.data);
            setIsLoding(false);
        };

        apiHandler();
    },[]);

    if(isLoding){return <div>loding...</div>}
    
    return(
        <>
        {!isLoding &&
        <div className="reservations-container">
            {reservationList?.content.map(r => 
               <div key={r.id} className="reservation-element">
                <p>{r.serviceMenuName}</p>
                <p>{r.designerName}</p>
                <p>{r.reservationStatus}</p>
                <p>{r.date}</p>
                <p>{r.time}</p>
               </div>
            )}
        </div>
        }
        </>
    )
}