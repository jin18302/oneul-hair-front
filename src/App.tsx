import { Route, Routes } from "react-router";
import Authendication from "./components/authendicationElement/Authendication";
import Login from "./components/authendicationElement/Login";
import Register from "./components/authendicationElement/Register";
import Init from "./components/common/Init";
import DesignerDetail from "./components/designer/DesignerDetail";
import DesignerEdit from "./components/designer/DesignerEdit";
import DesignerManagement from "./components/designer/DesignerManagement";
import DesignerRegister from "./components/designer/DesignerRegister";
import Menu from "./components/menu/MenuRegister";
import ReservationHistories from "./components/myPage/user/ReservationHistories";
import UserInfo from "./components/myPage/user/UserInfo";
import Reservation from "./components/reservation/Reservation";
import ReservationSuccess from "./components/reservation/ReservationSuccess";
import OwnerShopDetail from "./components/shop/OwnerShopDetail";
import ShopDetail from "./components/shop/ShopDetail";
import ShopDetailEdit from "./components/shop/ShopDetailEdit";
import ShopListView from "./components/shop/ShopListView";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Schedule from "./components/common/Schedule";

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
                        <Route path="shops/detail/:shopId" element={<ShopDetail />} />
                        <Route path="shops/:shopId/edit" element={<ShopDetailEdit />} />

                        <Route path="designers/:designerId" element={<DesignerDetail />} />
                        <Route path="my/designers/management"  element={<DesignerManagement/>}/>
                        <Route path = "my/shops/designers" element={<DesignerRegister/>}/>
                        <Route path = "designers/:designerId/edit" element={<DesignerEdit/>}/>

                        <Route path="designers/:designerId/menus" element={<Menu/>}/>
                
                        <Route path="designers/:designerId/reservations" element={<Reservation />} />
                        <Route path="users/reservation-histories" element={<ReservationHistories />} />
                        <Route path="reseration-success/:reservationId" element={<ReservationSuccess />} />
                        <Route path="/shops/schedules" element={<Schedule/>}/>

                    </Route>
                </Route>
            </Routes>
        </>
    )
}




