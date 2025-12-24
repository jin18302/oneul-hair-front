
import AuthButton from "../../components/AuthButton"
import { useLoginInfo } from "../../hooks/UseLoginInfo"
import MyPage from "../../pages/MyPage";
import "../../styles/Layout.css"

export default function Article(){

    const { isLoggedIn } = useLoginInfo();

    return(
        <article>
            {isLoggedIn ? <MyPage />  : <AuthButton />}
        </article>
    )

}