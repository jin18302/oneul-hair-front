import type { EventInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import type { ResourceInput } from "@fullcalendar/resource/index.js";
import { useEffect, useState } from "react";
import { parseDateToString } from "../../../utils/date";
import { getAccessToken } from "../../../utils/tokenmanager";
import { designerService } from "../../designer/service/designerService";
import { shopService } from "../../shop/service/shopService";
import { shopDetailInit, type ShopDetailRes } from "../../shop/type/response";
import "../../styles/Shedule.css";
import { scheduleService } from "../service/scheduleService";

export default function Schedule() {

    const [date, setDate] = useState<string>(parseDateToString({ date: new Date }));
    const [isReLoad, setIsReLoad] = useState<boolean>(false);
    const [resourceList, setResourceList] = useState<ResourceInput[]>();
    const [eventList, setEventList] = useState<EventInput[]>();
    const [shopDetail, setShopDetail] = useState<ShopDetailRes>(shopDetailInit);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const apiHanelr = async () => {

            const shopData = await shopService.getShopDetailByOwner(getAccessToken());
            setShopDetail(shopData);

            const designerData = await designerService.getDesignerListByOwner(getAccessToken());
            setResourceList(designerData.map(d => ({ id: String(d.id), title: d.name })));

            const eventData = await scheduleService.getShopSchedule(getAccessToken(), date);

            const events: object[] = [];

            for (let i = 0; i < eventData.length; i++) {
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