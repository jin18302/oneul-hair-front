export interface DayOffResponse{
     closedDays: string[]
}

export interface TimeSlotRes {
    time: string,
    isReservable: boolean
}

export interface BlockRes{

    id:number,
    date:string,
    time:string,
    blockType:string

}

export interface DesignerBlockRes {

    designerId: number,
    blockResponseList: BlockRes[]

}
