import { useEffect, useState } from "react";
import { axiosInstance } from "../AxiosInstance";
import "../styles/DateTimeSlot.css";
import type { TimeSlotRes } from "../types/TimeSlotRes";


export default function DateTimeSlot({ designerId, date, setTimeSlot } : { designerId: string | undefined, date: string, setTimeSlot: (t: string) => void }) {

    const [timeSlotList, setTimeSlotList] = useState<TimeSlotRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

          const designerTsGetHandler = async() => {

            const response = await axiosInstance.get<TimeSlotRes[]>(`/designers/${designerId}/time-slots`
                ,{ params: { date: date }});

                setTimeSlotList(response.data);
                setIsLoding(false);
          }

          designerTsGetHandler();

    },[]);

    const slotClickHandler = (t: string) => {
        setTimeSlot(t);
    };

    if(isLoding){return <div>Loding..</div>}

    return (
        <>
            <div className="time-slot-container">

                {!isLoding &&
                timeSlotList.map(t => 
                <div className={t.isReservable ? "time-slot" : "time-slot-deactivation"} key={t.time} onClick={() => slotClickHandler(t.time)}>{t.time}</div>)
                }
            </div>
        </>

    )
}