
import AuthButton from "../../features/auth/component/AuthButton";
import UserType from "../../utils/UserType";
import { useLoginInfoStore } from "../../contexts/loginInfoStore";
import "../../styles/Layout.css";

export default function Article() {

    const isLoggedIn = useLoginInfoStore(s => s.isLoggedIn);

    return (
        <article className="row-start-4 row-end-8 col-start-10 col-end-12">
            {isLoggedIn ? <UserType /> : <AuthButton />}
        </article>
    )
}


//loginInfo는 새로고침을 해도 값이 초기화 되면 안됨