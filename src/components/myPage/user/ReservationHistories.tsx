import { useEffect, useState } from "react"
import "../../../styles/ReservationHistories.css"
import { axiosInstance } from "../../../AxiosInstance";
import type { CursorPageResponse } from "../../../types/CursorPageResponse";
import type { Reservation } from "../../../types/Reservaton";

export default function ReservationHistories(){

    console.log("ReservationHistories rendering");

    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [reservationList, setReservationList] = useState<CursorPageResponse<Reservation>>();

    useEffect(() => {

        const apiHandler = async() => {
            
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get<CursorPageResponse<Reservation>>('/reservations',
                {  headers: { 'Authorization': token } }
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