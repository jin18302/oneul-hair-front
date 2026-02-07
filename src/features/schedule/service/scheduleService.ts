
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { DayOffResponse, DesignerBlockRes, TimeSlotRes } from "../type/response";

export const scheduleService = {
    getDesignerDayOff: async (designerId: string, month: number) => {
        const response = await axiosInstance.get<DayOffResponse>(`/auth/designers/${designerId}/off-days`,
            { params: { month: month } });
        return response.data;
    },
    getDesignerTimeSlot: async (designerId: string, date: string) => {
        const response = await axiosInstance.get<TimeSlotRes[]>(`/auth/designers/${designerId}/time-slots`
            , { params: { date: date } });
        return response.data;
    },
    getShopSchedule: async (date:string) => {
             const response = await axiosInstance.get<DesignerBlockRes[]>(`/shops/schedule-blocks`, { params: { date: date }});
                return response.data;
            }
}