

export interface CursorPageResponse<T>{

    content: T[];
    lastCursor: number;
    isLastPage: boolean;
}