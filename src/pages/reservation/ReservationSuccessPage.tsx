
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import "../../styles/ReservationSuccess.css"
import { getAccessToken } from "../../utils/tokenmanager";
import { reservationInit, type ReservationRes } from "../../features/reservation/type/response";
import { reservationService } from "../../features/reservation/service/reservationService";

export default function ReservationSuccessPage() {

    const { reservationId } = useParams();

    const [reservation, setReservation] = useState<ReservationRes>(reservationInit);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {

                const response = await reservationService.getReservationDetail(reservationId, getAccessToken());
                setReservation(response);
                setIsLoding(false);
         
        }
        apiHandler();
    }, []);

    return (
        <>
            {!isLoding && (
                <div className="reservation-success-info">
                    <h1>예약이 완료되었습니다.</h1>
                    <p>{reservation.designerName}</p>
                    <p>{reservation.serviceMenuName}</p>
                    <p>{reservation.reservationStatus}</p>
                    <p>{reservation.date}</p>
                    <p>{reservation.time}</p>
                </div>
            )}
        </>
    );

}