
import AuthButton from "../../components/authendicationElement/AuthButton";
import UserType from "../../components/myPage/user/UserType";
import { getIsLoggedIn } from "../../userInfo";
import "../../styles/Layout.css";

export default function Article(){
    console.log("isLoggedIn", getIsLoggedIn());
    return(
        <article>
            {getIsLoggedIn() ? <UserType />  :  <AuthButton />}
        </article>
    )
}