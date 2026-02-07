
import { axiosInstance } from "../../../common/config/axiosInstance";
import type { CreateReservationReq } from "../type/request";
import type { ReservationRes } from "../type/response";

export const reservationService = {
    
    createReservation: async (designerId: string, requestBody: CreateReservationReq) => {
        const response = await axiosInstance.post<ReservationRes>(`/designers/${designerId}/reservations`, requestBody);
        return response.data;
    },
    getReservaiton: async (reservationId: string) => {
        const response = await axiosInstance.get<ReservationRes>(`/reservations/${reservationId}`);
        return response.data;
    },
    getMyReservationList: async () => {
        const response = await axiosInstance.get<ReservationRes[]>(`/reservations`);
        return response.data;
    }
}