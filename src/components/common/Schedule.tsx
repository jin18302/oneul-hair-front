import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import "../../styles/Shedule.css"
import { useEffect, useState } from "react";
import type { DesignerBlock } from "../../types/DesignerBlock";
import { axiosInstance } from "../../utils/axiosInstance";
import type { ResourceInput } from "@fullcalendar/resource/index.js";
import type DesignerSummaryRes from "../../types/DesignerSummaryRes";
import type { EventInput } from "@fullcalendar/core";
import { shopDetailInit, type ShopDetailRes } from "../../types/ShopDetailRes";
import { getAccessToken } from "../../utils/tokenmanager";
import { parseDateToString } from "../../utils/date";

export default function Schedule() {

    const [date, setDate] = useState<string>(parseDateToString({ date: new Date }));
    const [isReLoad, setIsReLoad] = useState<boolean>(false);
    const [resourceList, setResourceList] = useState<ResourceInput[]>();
    const [eventList, setEventList] = useState<EventInput[]>();
    const [shopDetail, setShopDetail] = useState<ShopDetailRes>(shopDetailInit);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const apiHanelr = async () => {

            const token = getAccessToken();

            const shopData = await axiosInstance.get<ShopDetailRes>(`/shops`, { headers: { 'Authorization': token } });
            setShopDetail(shopData.data);

            const designerData = await axiosInstance.get<DesignerSummaryRes[]>('/shops/designers', { headers: { 'Authorization': token } });
            setResourceList(designerData.data.map(d => ({ id: String(d.id), title: d.name })));

            const eventData = await axiosInstance.get<DesignerBlock[]>(`/shops/schedule-blocks`, { params: { date: date }, headers: { Authorization: token } });

            const events: object[] = [];

            for (let i = 0; i < eventData.data.length; i++) {
                for (let j = 0; j < eventData.data[i].blockResponseList.length; j++) {

                    const d = new Date(`${eventData.data[i].blockResponseList[j].date}T${eventData.data[i].blockResponseList[j].time}:00`);
                    events.push({
                        id: eventData.data[i].blockResponseList[j].id,
                        resourceId: eventData.data[i].designerId,
                        start: d,
                        end: new Date(d.getTime() + 30 * 60 * 1000)
                    })
                }
            }
            setEventList(events);
            setIsReLoad(false);
            setIsLoading(false);
        }
        apiHanelr();
    }, [date, isReLoad]); //TODO 수정

    if (isLoading) { return <div>Loading...</div> }

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
                    resources={resourceList}
                    events={eventList}
                />
            </div>
        </>
    )

}