
import { useEffect, useState } from "react";
import { useParams } from "react-router"


import "../../styles/ReservationSuccess.css"
import { axiosInstance } from "../../AxiosInstance";
import { reservationInit, type Reservation } from "../../types/Reservaton";

export default function ReservationSuccess() {

    const { reservationId } = useParams();

    const [reservation, setReservation] = useState<Reservation>(reservationInit);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {

                const token = localStorage.getItem("token");
                const response = await axiosInstance.get<Reservation>(`/reservations/${reservationId}`,
                    { headers: { 'Authorization': token } }
                );
                setReservation(response.data);
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