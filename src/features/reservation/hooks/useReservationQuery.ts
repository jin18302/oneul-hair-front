import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { reservationService } from "../service/reservationService";
import type { CreateReservationReq } from "../type/request";

export function useCreateReservationQuery() {
    const mutation = useMutation({
        mutationFn: async (request: { designerId: string, body: CreateReservationReq }) => {
            return reservationService.createReservation(request.designerId, request.body);
        }
    });
    return mutation;
}

export function useGetReservationQuery(reservationId: string) {

    const { data } = useSuspenseQuery({
        queryKey: ['reservation', reservationId],
        queryFn: async () => {
           return reservationService.getReservaiton(reservationId);
        },
    });

    return { data };
}

export function useGetReservationListQuery() {
    const { data } = useSuspenseQuery({
        queryKey: ['reservation-histories'],
        queryFn: async () => {
           return reservationService.getMyReservationList();
        },
    });

    return { data };

}

