import { create } from "zustand";
import {persist} from "zustand/middleware"
import type { UserRes } from "../features/user/type/UserRes";

export interface LoginInfo{

    isLoggedIn : boolean;
    userName : string;
    userRole : string;

    setLoginInfo: (u : UserRes) => void;
    logOut : () => void;
}

export const useLoginInfoStore = create<LoginInfo>()(
    persist(
        (set) => ({
  
    isLoggedIn : false,
    userName : "",
    userRole : "",

    setLoginInfo: (u : UserRes) => {set({isLoggedIn: true, userName: u.name, userRole: u.userRole})},
    logOut : () => {
        set({isLoggedIn: false, userName: "", userRole: ""}); 
    } 
}),{name : "loginInfo"})
);