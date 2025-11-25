import { Outlet } from "react-router";
import "../styles/Layout.css";
import Article from "./Article";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {

  

    return (
        <>
            <div className="layout-container">
                <Header  />
                <Article />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}