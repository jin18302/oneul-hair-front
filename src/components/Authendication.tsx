import { Outlet } from "react-router";
import "../styles/Authendication.css"
import { useState } from "react";

export default function Authendication() {

    const [pageType, setPageType] = useState<string>("login");

    //기본적으로 로그인과 회원가입버튼을 전부 가지고 있어야함
    //회원가입페이지일때 로그인버튼을 누르면 로그인페이지를 호출 || 로그인페이지일때 회원가입버튼을 누르면 회원가입페이지를 호출
    //반대일 경우 submit처리를 한다.
    //기본으로 login페이지와 매치시키고, 타입이 signup이라면 회원가입페이지를 매치시킨다.

    return (
        <>
            <div className="container">
                <div className="page-button">회원가입</div>
                <div className="page-button">로그인</div>
                <div className="authendication-container">
                    <Outlet />
                </div>
            </div>

        </>
    )
}