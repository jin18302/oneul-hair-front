import { useSuspenseQuery } from "@tanstack/react-query";
import { scheduleService } from "../service/scheduleService";

export function useGetDesignerDayOffQuery(designerId: string, month: number) {

    const { data } = useSuspenseQuery({
        queryKey: ["designer-dayoff", designerId],
        queryFn: () => {
            return scheduleService.getDesignerDayOff(designerId, month);
        }
    });
    return { data };
}

export function useDesignerTimeSlotQuery(designerId: string, date: string) {

    const { data } = useSuspenseQuery({
        queryKey: ["designer-timeslot", designerId],
        queryFn: () => {
            return scheduleService.getDesignerTimeSlot(designerId, date);
        }
    });
    return { data };
}

export function useGetShopScheduleQuery(date: string) {
    const { data } = useSuspenseQuery({
        queryKey: ["shop-schedule"],
        queryFn:  () => {
            return scheduleService.getShopSchedule(date);
        }
    });
    return { data };

}

