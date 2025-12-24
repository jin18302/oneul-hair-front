import { useEffect, useState } from "react"
import { axiosInstance } from "../AxiosInstance";
import type { Reservation } from "../types/Reservaton";
import type { CursorPageResponse } from "../types/CursorPageResponse";
import "../styles/ReservationHistories.css"

export default function ReservationHistories(){

    const [isLoding, setIsLoding] = useState<boolean>(true);
    const [reservationList, setReservationList] = useState<CursorPageResponse<Reservation>>();

    useEffect(() => {

        const token = localStorage.getItem("token");

        const apiHandler = async() => {
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