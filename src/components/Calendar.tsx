import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from "@fullcalendar/react";
import "../styles/Calendar.css";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../AxiosInstance';
import type { DayOffResponse } from '../types/DayOffResponse';
import DateFomatter from '../hooks/DateFomatter';
import interactionPlugin from "@fullcalendar/interaction";
export default function Calendar({ setDate, designerId }: { setDate: (date: string) => void, designerId: string | undefined}) {

  const dayOffInit = { closedDays: [] };
  const [dayOffList, setDayOffList] = useState<DayOffResponse>(dayOffInit);
  const [month] = useState<number>(new Date().getMonth() + 1);
  const [isLoding, setIsLoding] = useState<boolean>(true);


  //TODO:
  // 휴무일 클릭 불가 설정, td 날짜 클릭시 해당 날짜 타임슬롯 렌더링, 날짜 슬롯 선택시 디자이너 메뉴 렌더링


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

    <>
      <div className="calendar-container">
        {!isLoding &&
          <FullCalendar
            height={500}
            contentHeight={500}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"

            dateClick={(arg) => {
              const date = DateFomatter({ date: arg.date });
              setDate(date);
            }}

            dayCellClassNames={
              (arg) => {
                for (let i = 0; i < dayOffList.closedDays.length; i++) {
                  if (DateFomatter({ date: arg.date }) == dayOffList.closedDays[i]) {
                    return "fc_day_off";
                  }
                }
                  return "";
              }
            }
          /> //full

        }
      </div>
    </>


  )
}
// dayCellClassNames