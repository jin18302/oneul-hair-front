import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from "@fullcalendar/react";
import "../../styles/Calendar.css";
import { useEffect, useState } from 'react';
import interactionPlugin from "@fullcalendar/interaction";
import { axiosInstance } from '../../AxiosInstance';
import type { DayOffResponse } from '../../types/DayOffResponse';
import React from 'react';

export function Calendar({ setDate, designerId }: { setDate: (date: string) => void, designerId: string | undefined }) {

  console.log("Calendar rendering");

  const dayOffInit = { closedDays: [] };
  const [ dayOffList, setDayOffList ] = useState<DayOffResponse>(dayOffInit);
  const [ month, setMonth ] = useState<number>(new Date().getMonth() + 1);
  const [ isLoding, setIsLoding ] = useState<boolean>(true);

  useEffect(() => {

    const apiHandler = async () => {

      const response = await axiosInstance.get<DayOffResponse>(`/auth/designers/${designerId}/off-days`,
        { params: { month: month } }
      );

      setDayOffList(response.data);
      setIsLoding(false);
    }

    apiHandler();

  }, [month]);


  if (isLoding) { return <div>loding...</div> }

  return (

      <div className="calendar-container">
        {!isLoding &&
          <FullCalendar height={500} contentHeight={500}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"

            dateClick={(arg) => {
              if (arg.date.getTime() <  new Date().setHours(0, 0, 0, 0) || dayOffList.closedDays.includes(arg.dateStr)){
                alert("헤당 일자는 예약 불가합니다.");
                return;
              }
              setDate(arg.dateStr);
            }}

            dayCellClassNames={(arg) => {
                if (arg.date.getTime() <  new Date().setHours(0, 0, 0, 0)) { return "disabled-day"; }
                if (dayOffList.closedDays.includes(arg.dateStr)) { return "fc_day_off"; }
                return "";
              }}
          /> //full
        }
      </div>
  )
}

export default React.memo(Calendar);