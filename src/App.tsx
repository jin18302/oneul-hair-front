import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Authendication from "./components/Authendication";


export default function App() {

    return (
        <>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="auth" element={<Authendication />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

