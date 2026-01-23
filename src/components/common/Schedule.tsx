import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import "../../styles/Shedule.css"
import { useEffect, useState } from "react";
import type { DesignerBlock } from "../../types/DesignerBlock";
import { axiosInstance } from "../../AxiosInstance";
import type { ResourceInput } from "@fullcalendar/resource/index.js";
import type DesignerSummaryRes from "../../types/DesignerSummaryRes";
import type { EventInput } from "@fullcalendar/core";
import { shopDetailInit, type ShopDetailRes } from "../../types/ShopDetailRes";
import { DateFommater } from "../../hooks/DateFomatter";

export default function Schedule() {

    const [date, setDate] = useState<string>(DateFommater({date: new Date}));
    const [resourceList, setResourceList] = useState<ResourceInput[]>();
    const [eventList, setEventList] = useState<EventInput[]>();
    const [shopDetail, setShopDetail] = useState<ShopDetailRes>(shopDetailInit);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const apiHanelr = async () => {

            const token = localStorage.getItem("token");

            const shopData = await axiosInstance.get<ShopDetailRes>(`/shops`, { headers: { 'Authorization': token } });
            setShopDetail(shopData.data);

            const designerData = await axiosInstance.get<DesignerSummaryRes[]>('/shops/designers', { headers: { 'Authorization': token } });
            setResourceList(designerData.data.map(d => ({ id: String(d.id), title: d.name })));

            const eventData = await axiosInstance.get<DesignerBlock[]>(`/shops/schedule-blocks`, {params:{date: date}, headers:{Authorization: token}});

            const events: object[] = [];

            for (let i = 0; i < eventData.data.length; i++) {
                for (let j = 0; j < eventData.data[i].blockResponseList.length; j++) {

                    const d = new Date(`${eventData.data[i].blockResponseList[j].date}T${eventData.data[i].blockResponseList[j].time }:00`);
                    events.push({
                        id: eventData.data[i].blockResponseList[j].id,
                        resourceId: eventData.data[i].designerId,
                        start:d,
                        end: new Date(d.getTime() + 30 * 60 * 1000)
                    })
                }
            }
            setEventList(events);
            setIsLoading(false);
        }
        apiHanelr();
    }, [date]);

    if (isLoading) {return <div>Loading...</div>}

    return (
        <div className="shop-schedule-container">
            <FullCalendar height={500} contentHeight={500}
                plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                initialView="resourceTimeline"

                resourceAreaHeaderContent="designers"
                resourcesInitiallyExpanded={false}

                datesSet={(info) => {setDate(DateFommater({date: info.start}))}}
                slotMinTime={shopDetail.openTime}
                slotMaxTime={shopDetail.endTime}
                slotDuration={{ minute: 30 }}
                resources={resourceList}
                events={eventList}
            />
        </div>
    )

}