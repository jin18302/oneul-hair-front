export interface LoginResponse {
    accessToken: string
}

export interface SignUpResposne {
    id: number;                // Java의 Long은 JS/TS에서 number입니다.
    name: string;
    email: string;
    gender: string;            // 위에서 정의한 enum 사용
    userRole: string;        // 위에서 정의한 enum 사용
    createdAt: string
}