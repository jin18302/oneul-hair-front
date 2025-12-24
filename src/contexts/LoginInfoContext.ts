import { createContext } from "react";

export interface LoginInfo{

    isLoggedIn :boolean;
    setIsLogin : (b: boolean) => void;
    userName : string;
    setUserName : (n: string) => void;
}

export const LoginInfoContext = createContext<LoginInfo | null>(null);