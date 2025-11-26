import { Route, Routes } from "react-router";
import Init from "./components/Init";
import ShopDetail from "./components/ShopDetail";
import ShopListView from "./components/ShopListView";
import Main from "./layouts/rootLayout/Main";
import SearchConditionProvider from "./providers/SearchConditionProvider";
import RootLayout from "./layouts/rootLayout/RootLayout";

export default function App() {


    return (
        <>
            <Routes>
                    <Route element={<SearchConditionProvider><RootLayout /></SearchConditionProvider>}>
                        <Route element={<Main/>}>
                         <Route path = "/" element={<Init />}/>
                         <Route path = "search" element={<ShopListView />}/>
                         <Route path="shop/detail/:shopId" element={<ShopDetail />} />
                        </Route>
                    </Route>
            </Routes>

        </>

    )
}


