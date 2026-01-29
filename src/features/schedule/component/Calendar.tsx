import type { DayCellContentArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from 'react';
import { getMonth, parseDateToString } from '../../../utils/date';
import "../../styles/Calendar.css";
import { scheduleService } from '../service/scheduleService';
import type { DayOffResponse } from '../type/response';

export function Calendar({ setDate, designerId }: { setDate: (date: string) => void, designerId: string | undefined }) {

  console.log("Calendar rendering");

  const dayOffInit = { closedDays: [] };
  const [dayOffList, setDayOffList] = useState<DayOffResponse>(dayOffInit);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [isLoding, setIsLoding] = useState<boolean>(true);

  useEffect(() => {

    const apiHandler = async () => {

      const response = await scheduleService.getDayOffListByDesigner(designerId, month)

      setDayOffList(response);
      setIsLoding(false);
    }

    apiHandler();

  }, [month]);

  const isDayOff = (date: string) => {
    return dayOffList.closedDays.includes(date);
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


  if (isLoding) { return <div>loding...</div> }

  return (

    <div className="calendar-container">
      {!isLoding &&
        <FullCalendar height={500} contentHeight={500}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"

          datesSet={(info) => {setMonth(getMonth(info.start)); setDate("");}}
          dateClick={(arg) => dateClickHandler(arg)}
          dayCellClassNames={(arg) => classNameHandler(arg)}
        /> //fullCalendar
      }
    </div>
  )
}

export default React.memo(Calendar);