

export interface CursorPageResponse<T>{

    content: T[];
    lastCursor: number;
    isLastPage: boolean;
}

  export const cursorPageResponseInit = { content: [], lastCursor: 0, isLastPage: true };