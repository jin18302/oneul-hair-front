import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import RootLayout from "./layouts/RootLayout";


export default function App() {

    return(
        <>
        <Routes>
            <Route element={<RootLayout/>}>
              <Route path="/" element={<Main />}/>
            </Route>
        </Routes>
        </>
    )
}

