import { NavLink, Outlet } from "react-router";

export default function AuthendicationPage() {

    //TODO 동적스타일링 적용

    return (
        <>
            <div className="col-start-1 col-end-12 row-start-1 row-end-12 w-250 h-auto">
                
                <NavLink to="sign-up" className={({ isActive }) => isActive ? "bg-white" : "notActive"}>
                    <div className="inline-block relative bg-gray-500 w-25 h-7.5 top-1.25
                    border-top-[5px] text-black text-center z-0">회원가입</div>
                </NavLink>

                <NavLink to="sign-in" className={({ isActive }) => isActive ? "bg-white" : "notActive"}>
                    <div className="inline-block relative bg-gray-500 w-25 h-7.5 top-1.25
                    border-top-[5px] text-black text-center z-0">
                        로그인
                    </div>
                </NavLink>

                <div className="flex flex-col justify-center items-center pt-5 pb-5 w-250 h-auto bg-white
                border border-black rounded-[10px]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}