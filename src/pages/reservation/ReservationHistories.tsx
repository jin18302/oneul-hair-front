// import "../../../styles/ReservationHistories.css"

import { useGetReservationListQuery} from "../../features/reservation/service/reservationService";

export default function ReservationHistories(){

    console.log("ReservationHistories rendering");
    const{data: reservationList} = useGetReservationListQuery();
    
    return(
        <div className="reservations-container">
            {reservationList.map(r => 
               <div key={r.id} className="reservation-element">
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