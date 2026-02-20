import { Outlet } from "react-router";

import Header from "./Header";
import Article from "./Article";
import Footer from "./Footer";

export default function RootLayout() {

    console.log("rayout rendering");

    return (
        <>
            <div className="grid grid-cols-12 grid-rows-12 items-center justify-items-center gap-16 w-full">
                <Header />
                <Article />
                <Outlet /> {/* main */}
                <Footer />
            </div>
        </>
    )
}