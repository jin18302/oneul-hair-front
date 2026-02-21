
import { useParams } from "react-router";
import { useGetReservationQuery } from "../../features/reservation/hooks/useReservationQuery";
// import "../../styles/ReservationSuccess.css"

export default function ReservationSuccessPage() {

    const { reservationId } = useParams() as {reservationId: string};
    const {data: reservation} = useGetReservationQuery(reservationId);

    return (
        <>
                <div className="col-start-1 col-end-12 row-start-1 row-end-12 bg-white border border-black">
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