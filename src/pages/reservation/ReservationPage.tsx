
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuListView from "../../features/menu/component/MenuListView";
import { reservationService } from "../../features/reservation/service/reservationService";
import Calendar from "../../features/schedule/component/Calendar";
import DateTimeSlot from "../../features/schedule/component/DateTimeSlot";
import { getAccessToken } from "../../utils/tokenmanager";


export default function ReservationPage() {

     console.log("Reservation rendering");

    const navigator = useNavigate();
    const { designerId } = useParams();

    //month가 바뀔때 date가 reset되어야함

    const [ reservationDate, setReservationDate ] = useState<string>("");
    const [ timeSlot, setTimeSlot ] = useState<string>("");
    const [ menu, setMenu ] = useState<number>(0);

    const reservationHandler = async() => {

        const requestBody = {
            serviceMenuId: menu,
            date: reservationDate,
            time: timeSlot
        };

        const token = getAccessToken();

        if(token == null){
            alert("해당 서비스는 로그인 후 가능합니다.");
            navigator("/auth/sign-in");
        }

        await reservationService.createReservation(designerId, token, requestBody)
    }

    return (
        <>
            <Calendar setDate={setReservationDate} designerId={designerId} />
            {reservationDate && <DateTimeSlot designerId={designerId} date={reservationDate} setTimeSlot={setTimeSlot} />}
            {timeSlot &&  <MenuListView designerId = {Number(designerId)} menuClickFuntion = {setMenu}/>}
            {menu && <button onClick={reservationHandler}>예약하기</button>}
        </>
    )
}