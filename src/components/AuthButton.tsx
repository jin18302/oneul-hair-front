import { useState } from "react";
import Authendication from "./Authendication";
import "../styles/AuthButton.css"

//TODO: 버튼 css 수정
export default function AuthButton(){
    const [isShowAuthPage, setIsShowAuthPage] = useState<boolean>(false);

    return(
        <div>
            <button id = "auth-button"onClick={() => setIsShowAuthPage(true)}>로그인/회원가입</button>
            {isShowAuthPage && <Authendication />}
        </div>
    )
}