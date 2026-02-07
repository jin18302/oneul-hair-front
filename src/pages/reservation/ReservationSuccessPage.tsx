
import { useParams } from "react-router";
// import "../../styles/ReservationSuccess.css"
import { useGetReservationQuery } from "../../features/reservation/service/reservationService";

export default function ReservationSuccessPage() {

    const { reservationId } = useParams();
    const {data: reservation} = useGetReservationQuery(reservationId);

    return (
        <>
                <div className="reservation-success-info">
                    <h1>예약이 완료되었습니다.</h1>
                    <p>{reservation.designerName}</p>
                    <p>{reservation.serviceMenuName}</p>
                    <p>{reservation.reservationStatus}</p>
                    <p>{reservation.date}</p>
                    <p>{reservation.time}</p>
                </div>
        </>
    );

}