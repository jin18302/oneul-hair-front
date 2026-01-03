import { Route, Routes } from "react-router";
import DesignerDetail from "./components/DesignerDetail";
import Init from "./components/Init";
import ShopDetail from "./components/ShopDetail";
import ShopListView from "./components/ShopListView";
import Login from "./components/authendicationElement/Login";
import Register from "./components/authendicationElement/Register";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Authendication from "./pages/Authendication";
import Reservation from "./pages/Reservation";
import ReservationSuccess from "./pages/ReservationSuccess";
import UserInfo from "./components/myPage/user/UserInfo";
import ReservationHistories from "./components/myPage/user/ReservationHistories";

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
                            <Route path="sign-up" element={<Register />} />
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




