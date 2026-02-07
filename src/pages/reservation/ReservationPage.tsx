
import { useState } from "react";
import { useParams } from "react-router";
import MenuListView from "../../features/menu/component/MenuListView";
import { useCreateReservationQuery } from "../../features/reservation/service/reservationService";
import Calendar from "../../features/schedule/component/Calendar";
import DateTimeSlot from "../../features/schedule/component/DateTimeSlot";


export default function ReservationPage() {

    console.log("Reservation rendering");

    const { designerId } = useParams();
    const { mutateAsync: crerateReservation } = useCreateReservationQuery();

    const [reservationDate, setReservationDate] = useState<string>("");
    const [timeSlot, setTimeSlot] = useState<string>("");
    const [menu, setMenu] = useState<number>(0);

    const reservationHandler = async () => {
        const requestBody = {
            serviceMenuId: menu,
            date: reservationDate,
            time: timeSlot
        };

        await crerateReservation({ designerId: designerId, body: requestBody });
    }

    return (
        <>
            <Calendar setDate={setReservationDate} designerId={designerId} />
            {reservationDate && <DateTimeSlot designerId={designerId} date={reservationDate} setTimeSlot={setTimeSlot} />}
            {timeSlot && <MenuListView designerId={Number(designerId)} menuClickFuntion={setMenu} />}
            {menu && <button onClick={reservationHandler}>예약하기</button>}
        </>
    )
}