import {useState } from "react";
import Calendar from "../components/reservationElement/Calendar";
import DateTimeSlot from "../components/reservationElement/DateTimeSlot";
import { useNavigate, useParams } from "react-router";
import MenuView from "../components/MenuView";
import { axiosInstance } from "../AxiosInstance";
import { HttpStatusCode, isAxiosError } from "axios";
import type { Reservation } from "../types/Reservaton";

export default function Reservation() {

     console.log("Reservation rendering");

    const navigator = useNavigate();
    const { designerId } = useParams();

    const [ date, setDate ] = useState<string>("");
    const [ timeSlot, setTimeSlot ] = useState<string>();
    const [ menu, setMenu ] = useState<number | null>(null);

    const reservationHandler = async() => {

        const requestBody = {
            serviceMenuId: menu,
            date: date,
            time: timeSlot
        };

        const token = localStorage.getItem("token");

        if(token == null){
            alert("해당 서비스는 로그인 후 가능합니다.");
            navigator("/auth/sign-in");
        }

        try{
             const response = await axiosInstance.post<Reservation>(`/designers/${designerId}/reservations`, 
            requestBody,
            { headers: { 'Authorization': token }});

        if( response.status === HttpStatusCode.Created ){
            navigator(`/reseration-success/${response.data.id}`);
        }

        }catch(e: unknown){
            if(isAxiosError(e)){
                alert(e.response?.data?.errorMessage ?? "예약중 오류가 발생했습니다. 다시 시도해주세요");
            }
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