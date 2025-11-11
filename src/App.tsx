import { Route, Routes } from "react-router";
import Main from "./assets/pages/main";


export default function App() {

    return(
        <>
        <Routes>
            <Route path="/" element={<Main />}/>
        </Routes>
        </>
    )
}

