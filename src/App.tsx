import { Route, Routes } from "react-router";
import Init from "./common/Init";
import DesignerDetail from "./features/designer/component/DesignerDetail";
import DesignerEdit from "./features/designer/component/DesignerEdit";
import DesignerRegister from "./features/designer/component/DesignerRegister";
import Schedule from "./features/schedule/component/Schedule";
import ShopSearchResult from "./features/shop-search/component/ShopSearchResult";
import OwnerShopDetail from "./features/shop/component/OwnerShopDetail";
import ShopDetail from "./features/shop/component/ShopDetail";
import ShopDetailEdit from "./features/shop/component/ShopDetailEdit";
import UserInfo from "./features/user/component/UserInfo";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import Authendication from "./pages/auth/AuthendicationPage";
import DesignerManagementPage from "./pages/designer/DesignerManagementPage";
import ReservationHistories from "./pages/reservation/ReservationHistories";
import Reservation from "./pages/reservation/ReservationPage";
import ReservationSuccess from "./pages/reservation/ReservationSuccessPage";
import LoginForm from "./features/auth/component/LoginForm";
import SignUpDispatcher from "./features/auth/component/SignUpDispatcher";

export default function App() {

    return (
        <>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route element={<Main />}>
                        <Route path="/" element={<Init />} />

                        {/* 로그인, 회원가입 관련 */}
                        <Route element={<Authendication />}>
                            <Route path="sign-in" element={<LoginForm />} />
                            <Route path="sign-up" element={<SignUpDispatcher />} />
                        </Route>

                        <Route path="/users" element={<UserInfo />} />

                        <Route path="search" element={<ShopSearchResult />} />
                        <Route path="my/shops" element={<OwnerShopDetail />} />
                        <Route path="shops/detail/:shopId" element={<ShopDetail />} />
                        <Route path="shops/:shopId/edit" element={<ShopDetailEdit />} />

                        <Route path="designers/:designerId" element={<DesignerDetail />} />
                        <Route path="my/designers/management"  element={<DesignerManagementPage/>}/>
                        <Route path = "my/shops/designers" element={<DesignerRegister/>}/>
                        <Route path = "designers/:designerId/edit" element={<DesignerEdit/>}/>
{/* 
                        <Route path="designers/:designerId/menus" element={<MenuItem/>}/> */}
                
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




