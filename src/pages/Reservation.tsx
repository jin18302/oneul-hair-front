import { useState } from "react";
import Calendar from "../components/Calendar";
import DateTimeSlot from "../components/DateTimeSlot";
import { useParams } from "react-router";
import MenuView from "../components/MenuView";
import { axiosInstance } from "../AxiosInstance";
import { HttpStatusCode } from "axios";

export default function Reservation() {

    const { designerId } = useParams();
    const [date, setDate] = useState<string>("");
    const [timeSlot, setTimeSlot] = useState<string>();
    const [menu, setMenu] = useState<number | null>(null);

    const reservationHandler = async() => {

        const requestBody = {
            serviceMenuId: menu,
            date: date,
            time: timeSlot
        };

        const response = await axiosInstance.post(`/designers/${designerId}/reservations`, requestBody);

        if( response.status === HttpStatusCode.Created ){
            console.log("예약 성공", response.data);
            // TODO: 몰라 어케하지
        }
    }

    return (
        <>
            <Calendar setDate={setDate} designerId={designerId} />
            {date && <DateTimeSlot designerId={designerId} date={date} setTimeSlot={setTimeSlot} />}
            {timeSlot && <MenuView designerId={designerId} setMenu={setMenu} />}
            {menu && <button onClick={reservationHandler}>예약하기</button>}
        </>
    )
}