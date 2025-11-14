import { useState } from "react";
import Authendication from "./Authendication";
import "../styles/AuthButton.css"

//TODO: 버튼 css 수정
export default function AuthButton(){
    const [isShowAuthPage, setIsShowAuthPage] = useState<boolean>(false);

    return(
        <div>
            <button id = "auth-button" onClick={() => setIsShowAuthPage(true)}>로그인/회원가입</button>
            {isShowAuthPage && <Authendication />}
        </div>
    )
}

//TODO: auth-button 을 누르면 네비게이션으로 auth/login페이지로 이동시킨다.