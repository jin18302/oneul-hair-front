import { NavLink, Outlet } from "react-router";
// import "../../styles/Authendication.css"

export default function AuthendicationPage() {

    return (
        <>
            <div className="form-container">

                <NavLink to="sign-up" className={({isActive}) => isActive ? "active" : "notActive"}>
                    <div className="page-button">회원가입</div>
                </NavLink>

                <NavLink to="sign-in" className={({isActive}) => isActive ? "active" : "notActive"}>
                    <div className="page-button">로그인</div>
                </NavLink>

                <div className="authendication-container">
                    <Outlet />
                </div>

            </div>
        </>
    )
}