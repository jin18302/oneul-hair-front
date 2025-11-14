import { Link, Outlet } from "react-router";
import "../styles/Authendication.css"

export default function Authendication() {

    return (
        <>
            <div className="container">

                <Link to="/auth/signup">
                    <div className="page-button">회원가입</div>
                </Link>

                <Link to="/auth/login">
                    <div className="page-button">로그인</div>
                </Link>

                <div className="authendication-container">
                    <Outlet />
                </div>

            </div>
        </>
    )
}