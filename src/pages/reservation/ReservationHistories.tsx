// import "../../../styles/ReservationHistories.css"

import { useGetReservationListQuery } from "../../features/reservation/hooks/useReservationQuery";


export default function ReservationHistories(){

    console.log("ReservationHistories rendering");
    const{data: reservationList} = useGetReservationListQuery();
    
    return(
        <div className="col-start-2 col-end-12 row-start-2 row-end-12 w-200 bg-white border border-black">
            {reservationList.map(r => 
               <div key={r.id} className="bg-white border border-black">
                <p>{r.serviceMenuName}</p>
                <p>{r.designerName}</p>
                <p>{r.reservationStatus}</p>
                <p>{r.date}</p>
                <p>{r.time}</p>
               </div>
            )}
        </div>
    )
}