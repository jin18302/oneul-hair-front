
import AuthButton from "../../components/authendicationElement/AuthButton"
import UserType from "../../components/myPage/user/UserType";
import { userInfoStore } from "../../contexts/userInfoStore";
import "../../styles/Layout.css"

export default function Article(){

    const isLoggedIn = userInfoStore(s => s.isLoggedIn);

    return(
        <article>
            {isLoggedIn ? <UserType />  : <AuthButton />}
        </article>
    )
}