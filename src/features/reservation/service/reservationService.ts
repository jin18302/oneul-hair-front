import { isAxiosError } from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import type { CreateReservationReq } from "../type/request";
import type { ReservationRes } from "../type/response";

export const reservationService = {

    createReservation: async (designerId: string | undefined, token: string, request: CreateReservationReq): Promise<ReservationRes> => {

        try {
            const response = await axiosInstance.post<ReservationRes>(`/designers/${designerId}/reservations`,
                request,
                { headers: { 'Authorization': token } });

            return response.data;

        } catch (e: unknown) {
            if (isAxiosError(e)) {
                alert(e.response?.data?.errorMessage ?? "예약중 오류가 발생했습니다. 다시 시도해주세요");
            }
            throw e;
        }
    },

    getReservationDetail: async (reservationId: string | undefined, token: string):Promise<ReservationRes> => {

        try {
            const response = await axiosInstance.get<ReservationRes>(`/reservations/${reservationId}`,
                { headers: { 'Authorization': token } });
                return response.data;
        }catch (e: unknown) {
            if (isAxiosError(e)) {
                alert(e.response?.data?.errorMessage ?? "데이터 조회 중 오류가 발생했습니다. 다시 시도해주세요");
            }
            throw e;
        }

    }
}