import type { DayCellContentArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React, { useState } from 'react';
import { getMonth, parseDateToString } from '../../../utils/date';
import { useGetDesignerDayOffQuery } from '../hook/useScheduleQuery';
// import "../../styles/Calendar.css";

export function Calendar({ setDate, designerId }: { setDate: (date: string) => void, designerId: string}) {

  console.log("Calendar rendering");

  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const { data: dayOffList} = useGetDesignerDayOffQuery(designerId, month);

  
  const isDayOff = (date: string) => {
    return dayOffList?.closedDays.includes(date);
  }

  const dateClickHandler = (arg: DateClickArg) => {
    const isBefore = arg.date.getTime() < new Date().setHours(0, 0, 0, 0);

    if (isBefore || isDayOff(arg.dateStr)) {
      alert("해당 날짜는 예약 불가합니다.");
      return;
    }
    setDate(arg.dateStr);
  }

  const classNameHandler = (arg: DayCellContentArg) => {
    const date = parseDateToString({ date: arg.date });

    if (arg.isPast || isDayOff(date)) { return "disabled-day"; }
    return "";

  } //TODO: 클래스 또는 파일로 분리 고려


  return (

    <div className="col-start-1 col-end-12 row-start-1 row-end-4">
      <FullCalendar height={500} contentHeight={500}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"

        datesSet={(info) => { setMonth(getMonth(info.start)); setDate(""); }}
        dateClick={(arg) => dateClickHandler(arg)}
        dayCellClassNames={(arg) => classNameHandler(arg)}
      />
    </div>
  )
}

export default React.memo(Calendar);