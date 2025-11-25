import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import SearchConditionProvider from "./providers/SearchConditionProvider";
import Main from "./layouts/Main";
import Init from "./components/Init";
import ShopListView from "./components/ShopListView";

export default function App() {


    return (
        <>
            <Routes>
                    <Route element={<SearchConditionProvider><RootLayout /></SearchConditionProvider>}>
                        <Route element={<Main/>}>
                         <Route path = "/" element={<Init />}/>
                         <Route path = "search" element={<ShopListView />}/>
                        </Route>
                    </Route>
            </Routes>

        </>

    )
}


