import { Outlet } from "react-router";
import Article from "./Article";
import Header from "./Header";

export default function RootLayout() {

    return (
        <>
            <Header />
            <Article />
            <Outlet />
        </>
    )
}