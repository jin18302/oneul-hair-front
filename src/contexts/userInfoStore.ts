import { create } from "zustand";
import type { UserRes } from "../types/UserRes";

export interface UserInfo{

    isLoggedIn : boolean;
    userName : string;
    userRole : string;

    setUserInfo: (u : UserRes) => void;
    logOut : () => void;
}

export const userInfoStore = create<UserInfo>((set) => ({
  
    isLoggedIn : false,
    userName : "",
    userRole : "",

    setUserInfo: (u : UserRes) => {set({isLoggedIn: true, userName: u.name, userRole: u.userRole})},
    logOut : () => {
        localStorage.removeItem("token");
        set({isLoggedIn: false, userName: "", userRole: ""}); 
    } 
})
);
