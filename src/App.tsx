import { Route, Routes } from "react-router";
import Init from "./components/common/Init";
import ShopDetail from "./components/shop/ShopDetail";
import ShopListView from "./components/shop/ShopListView";
import Login from "./components/authendicationElement/Login";
import Register from "./components/authendicationElement/Register";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Authendication from "./components/authendicationElement/Authendication";
import UserInfo from "./components/myPage/user/UserInfo";
import ReservationHistories from "./components/myPage/user/ReservationHistories";
import DesignerDetail from "./components/designer/DesignerDetail";
import Reservation from "./components/reservation/Reservation";
import ReservationSuccess from "./components/reservation/ReservationSuccess";
import OwnerShopDetail from "./components/shop/OwnerShopDetail";
import ShopDetailEdit from "./components/shop/ShopDetailEdit";

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
                        <Route path="my/shops" element={<OwnerShopDetail />} />
                        <Route path="shops/:shopId" element={<ShopDetail />} />
                        <Route path="shops/:shopId/edit" element={<ShopDetailEdit />} />

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




