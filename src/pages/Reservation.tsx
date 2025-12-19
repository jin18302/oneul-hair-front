import { useState } from "react";
import Calendar from "../components/Calendar";
import DateTimeSlot from "../components/DateTimeSlot";
import { useParams } from "react-router";
import MenuView from "./MenuView";

export default function Reservation(){

    const { designerId } = useParams();
    const [ date, setDate ] = useState<string>("");
    const [ timeSlot, setTimeSlot ] = useState<string>();

    return(
        <>
        <Calendar setDate = {setDate} designerId={designerId}  />
        { date && <DateTimeSlot designerId={designerId} date = {date} setTimeSlot = {setTimeSlot}/>}
        { timeSlot && <MenuView designerId = {designerId}/> }
        </>
    )
}