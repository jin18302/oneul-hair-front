import type { EventInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { useEffect, useState } from "react";
import { parseDateToString } from "../../../utils/date";
import { useGetMyDesignerList } from "../../designer/hook/useDesignerQuery";
import { useGetShopScheduleQuery } from "../hook/useScheduleQuery";
import { useGetShopQuery } from "../../shop/hook/useShopQuery";
// import "../../styles/Shedule.css";


export default function Schedule() {

    const [date, setDate] = useState<string>(parseDateToString({ date: new Date }));
    const [isReLoad, setIsReLoad] = useState<boolean>(false);
    const {data:designerList} = useGetMyDesignerList();
    const [eventList, setEventList] = useState<EventInput[]>();
    const {data: shopSchesule} = useGetShopScheduleQuery(date);
    const {data: shopDetail} = useGetShopQuery("");
    const {data: eventData} = useGetShopScheduleQuery(date);

    useEffect(() => {

        const apiHanelr = async () => {

            const events: object[] = [];

            for (let i = 0; i < shopSchesule.length; i++) {
                for (let j = 0; j < eventData[i].blockResponseList.length; j++) {

                    const d = new Date(`${eventData[i].blockResponseList[j].date}T${eventData[i].blockResponseList[j].time}:00`);
                    events.push({
                        id: eventData[i].blockResponseList[j].id,
                        resourceId: eventData[i].designerId,
                        start: d,
                        end: new Date(d.getTime() + 30 * 60 * 1000)
                    })
                }
            }
            setEventList(events);
            setIsReLoad(false);
        }
        apiHanelr();
    }, [date, isReLoad]); //TODO 수정

    const dataReLoadHandler = () => { setIsReLoad(true) }

    return (
        <>
            <div className="shop-schedule-container">
                <FullCalendar height={500} contentHeight={500}
                    plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                    initialView="resourceTimelineDay"
                    headerToolbar={{
                        left: "dataReLoad"
                    }}

                    customButtons={{
                        dataReLoad: {
                            text: "새로고침",
                            click: dataReLoadHandler
                        }
                    }}

                    resourceAreaHeaderContent="designers"
                    resourcesInitiallyExpanded={false}

                    datesSet={(info) => { setDate(parseDateToString({ date: info.start })) }}
                    slotMinTime={shopDetail.openTime}
                    slotMaxTime={shopDetail.endTime}
                    slotDuration={{ minute: 30 }}
                    resources={designerList.map(d => ({ id: String(d.id), title: d.name }))}
                    events={eventList}
                />
            </div>
        </>
    )

}