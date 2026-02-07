import { useLoginInfoStore } from "../contexts/loginInfoStore";
import ShopOwnerMyPage from "../features/myPage/component/owner/ShopOwnerMyPage";
import UserMyPage from "../features/myPage/component/user/UserMyPage";

export default function UserType(){

    const userRole = useLoginInfoStore(s => s.userRole);

    switch(userRole){
        case "CUSTOMER" : return <div className="my-page-container"><UserMyPage/></div>
        case "OWNER" : return <div className="my-page-container"><ShopOwnerMyPage /></div>
        default : throw new Error("유효하지 않은 userRole입니다.");
    }
}