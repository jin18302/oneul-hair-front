import { useEffect, useState } from "react";

import "../../styles/DateTimeSlot.css"
import React from "react";
import type { TimeSlotRes } from "../type/response";
import { scheduleService } from "../service/scheduleService";


function DateTimeSlot({ designerId, date, setTimeSlot } : { designerId: string | undefined, date: string, setTimeSlot: (t: string) => void }) {

    console.log("DateTimeSlot rendering");

    const [timeSlotList, setTimeSlotList] = useState<TimeSlotRes[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

          const designerTsGetHandler = async() => {

            const response = await scheduleService.getTimeSlotByDesigner(designerId, date);
                setTimeSlotList(response);
                setIsLoding(false);
          }

          designerTsGetHandler();

    },[date]);

    const slotClickHandler = (t: string) => {

    const timeSlot = timeSlotList.find(s => s.time == t);
    
    if(!timeSlot?.isReservable){
        alert("해당 시간은 예약 불가합니다.");
        return;
    }
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

export default React.memo(DateTimeSlot);