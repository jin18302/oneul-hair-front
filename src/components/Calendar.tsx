import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from "@fullcalendar/react";
import "../styles/Calendar.css";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../AxiosInstance';
import { useParams } from 'react-router';
import type { DayOffResponse } from '../types/DayOffResponse';
import DateFomatter from '../hooks/DateFomatter';

export default function Calendar() {

  const dayOffInit = { closedDays: [] };

  const { designerId } = useParams();
  const [dayOffList, setDayOffList] = useState<DayOffResponse>(dayOffInit);
  const [month] = useState<number>(new Date().getMonth() + 1);
  const [isLoding, setIsLoding] = useState<boolean>(true);



  useEffect(() => {

    const apiHandler = async () => {

      const response = await axiosInstance.get<DayOffResponse>(`/designers/${designerId}/off-days`,
        { params: { month: month } }
      );

      setDayOffList(response.data);
      setIsLoding(false);
    }

    apiHandler();

  }, []);

  if (isLoding) { return <div>loding...</div> }

  return (

    <div className="calendar-container">
      {!isLoding &&
        <FullCalendar
          height={500}
          contentHeight={500}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"

          dayCellClassNames={
            (arg) => {
              for (let i = 0; i < dayOffList.closedDays.length; i++) {

                if (DateFomatter({date: arg.date}) == dayOffList.closedDays[i]) {
                  console.log("휴무일", dayOffList.closedDays[i]);
                  return "fc_day_off";
                }
              }
              return "";
            }
          }
        /> //full
      }
    </div>

  )
}
// dayCellClassNames