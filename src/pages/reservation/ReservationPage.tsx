
import { useState } from "react";
import { useParams } from "react-router";
import MenuListView from "../../features/menu/component/MenuListView";
import Calendar from "../../features/schedule/component/Calendar";
import DateTimeSlot from "../../features/schedule/component/DateTimeSlot";
import { useCreateReservationQuery } from "../../features/reservation/hooks/useReservationQuery";


export default function ReservationPage() {

    console.log("Reservation rendering");

    const { designerId } = useParams() as {designerId: string};
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
            {timeSlot && <MenuListView designerId={designerId} menuClickFuntion={setMenu} />}
            {menu && <button onClick={reservationHandler}>예약하기</button>}
        </>
    )
}