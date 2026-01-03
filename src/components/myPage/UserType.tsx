import { userInfoStore } from "../../contexts/userInfoStore";
import ShopOwnerMyPage from "./owner/ShopOwnerMyPage";
import UserMyPage from "./user/UserMyPage";

export default function UserType(){

    const userType = userInfoStore(s => s.userRole);

    switch(userType){
        case "CUSTOMER" : return <div className="my-page-container"><UserMyPage/></div>
        case "OWNER" : return <div className="my-page-container"><ShopOwnerMyPage /></div>
        default : throw new Error("유효하지 않은 userRole입니다.");
    }
}