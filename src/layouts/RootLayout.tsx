import { Outlet } from "react-router";
import Article from "./Article";
import Header from "./Header";
import SearchArea from "../components/SearchArea";

export default function RootLayout() {

    return (
        <>
            <Header />
            <SearchArea />
            <Article />
            
            <Outlet />
        </>
    )
}