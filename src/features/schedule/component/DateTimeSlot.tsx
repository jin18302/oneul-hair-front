
// import "../../styles/DateTimeSlot.css"
import React from "react";
import { useDesignerTimeSlotQuery } from "../hook/useScheduleQuery";


function DateTimeSlot({ designerId, date, setTimeSlot }: { designerId: string, date: string, setTimeSlot: (t: string) => void }) {

    console.log("DateTimeSlot rendering");

    const { data: timeSlotList } = useDesignerTimeSlotQuery(designerId, date);

    const slotClickHandler = (t: string) => {
        const timeSlot = timeSlotList?.find(s => s.time == t);

        if (!timeSlot?.isReservable) {
            alert("해당 시간은 예약 불가합니다.");
            return;
        }
        setTimeSlot(t);
    };

    return (
        <div className="time-slot-container">
            {timeSlotList?.map(t =>
                <div className={t.isReservable ? "time-slot" : "time-slot-deactivation"} key={t.time}
                    onClick={() => slotClickHandler(t.time)}>{t.time}</div>)
            }
        </div>
    )
}

export default React.memo(DateTimeSlot);