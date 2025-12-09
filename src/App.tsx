import { Route, Routes } from "react-router";
import DesignerDetail from "./components/DesignerDetail";
import Init from "./components/Init";
import ShopDetail from "./components/ShopDetail";
import ShopListView from "./components/ShopListView";
import Main from "./layouts/rootLayout/Main";
import RootLayout from "./layouts/rootLayout/RootLayout";
import SearchConditionProvider from "./providers/SearchConditionProvider";

export default function App() {


    return (
        <>
            <Routes>
                    <Route element={<SearchConditionProvider><RootLayout /></SearchConditionProvider>}>
                        <Route element={<Main/>}>
                         <Route path = "/" element={<Init />}/>
                         <Route path = "search" element={<ShopListView />}/>
                         <Route path="shops/detail/:shopId" element={<ShopDetail />} />
                         <Route path="designers/:designerId" element={<DesignerDetail />}/>
                        </Route>
                    </Route>
            </Routes>
        </>
    )
}


