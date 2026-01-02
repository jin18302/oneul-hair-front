import { Outlet } from "react-router";
import "../../styles/Layout.css"
import Header from "./Header";
import Article from "./Article";
import Footer from "./Footer";
import LoginInfoProvider from "../../providers/LoginInfoProvider";

export default function RootLayout() {

    console.log("rayout rendering");

    return (
        <>
            <div className="layout-container">
                <Header />

                <LoginInfoProvider>
                    <Article />
                    <Outlet /> {/* main */}
                </LoginInfoProvider>

                <Footer />
            </div>
        </>
    )
}