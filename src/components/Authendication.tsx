import { NavLink, Outlet } from "react-router";
import "../styles/Authendication.css"

export default function Authendication() {

    return (
        <>
            <div className="container">

                <NavLink to="/auth/signup" className={({isActive}) => isActive ? "active" : "notActive"}>
                    <div className="page-button">회원가입</div>
                </NavLink>

                <NavLink to="/auth/login" className={({isActive}) => isActive ? "active" : "notActive"}>
                    <div className="page-button">로그인</div>
                </NavLink>

                <div className="authendication-container">
                    <Outlet />
                </div>

            </div>
        </>
    )
}