import { isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { DayOffResponse, DesignerBlockRes, TimeSlotRes } from "../type/response";

export const scheduleService = {

    getDayOffListByDesigner: async (designerId: string | undefined, month: number) => {
        try {
            const response = await axiosInstance.get<DayOffResponse>(`/auth/designers/${designerId}/off-days`,
                { params: { month: month } });
            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "데이터 조회 중 문제가 발생했습니다.");
            }
            throw e;
        }
    },

    getTimeSlotByDesigner: async (designerId: string | undefined, date: string): Promise<TimeSlotRes[]> => {
        try {
            const response = await axiosInstance.get<TimeSlotRes[]>(`/auth/designers/${designerId}/time-slots`
                , { params: { date: date } });

            return response.data
        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "데이터 조회 중 문제가 발생했습니다.");
            }
            throw e;
        }
    },

    getShopSchedule: async (token: string, date: string) => {

        try {
            const response = await axiosInstance.get<DesignerBlockRes[]>(`/shops/schedule-blocks`
                , { params: { date: date }, headers: { Authorization: token } });

            return response.data;

        } catch (e: unknown) {

            if (isAxiosError(e)) { // 이것을 인터셉트로 뽑으면 어떻가
                alert(e.response?.data?.errorMessage ?? "데이터 조회 중 문제가 발생했습니다.");
            }
            throw e;
        }

    }
}