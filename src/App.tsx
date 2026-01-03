import { Route, Routes } from "react-router";
import DesignerDetail from "./components/DesignerDetail";
import Init from "./components/Init";
import Login from "./components/authendicationElement/Login";
import ShopDetail from "./components/ShopDetail";
import ShopListView from "./components/ShopListView";
import SignUp from "./components/authendicationElement/Signup";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Authendication from "./pages/Authendication";
import Reservation from "./pages/Reservation";
import UserInfo from "./pages/UserInfo";
import ReservationHistories from "./pages/ReservationHistories";
import ReservationSuccess from "./pages/ReservationSuccess";
import ShopRegistration from "./components/authendicationElement/ShopRegistration";

export default function App() {

    return (
        <>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route element={<Main />}>
                        <Route path="/" element={<Init />} />

                        {/* 로그인, 회원가입 관련 */}
                        <Route element={<Authendication />}>
                            <Route path="sign-in" element={<Login />} />
                            <Route path="sign-up" element={<SignUp />} />
                            <Route path="shops" element={<ShopRegistration />} />
                            {/* 기업 회원가입 */}
                        </Route>


                        <Route path="/users" element={<UserInfo />} />

                        <Route path="search" element={<ShopListView />} />
                        <Route path="shops/detail/:shopId" element={<ShopDetail />} />
                        <Route path="designers/:designerId" element={<DesignerDetail />} />

                        <Route path="designers/:designerId/reservations" element={<Reservation />} />
                        <Route path="users/reservation-histories" element={<ReservationHistories />} />
                        <Route path="reseration-success/:reservationId" element={<ReservationSuccess />} />

                    </Route>
                </Route>
            </Routes>
        </>
    )
}




