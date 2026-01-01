
export interface Reservation {

    id: number,
    serviceMenuName: string,
    designerName: string,
    reservationStatus: string,
    date: string,
    time: string
}

export const reservationInit =
{
    id: 0,
    serviceMenuName: "",
    designerName: "",
    reservationStatus: "",
    date: "",
    time: ""
}