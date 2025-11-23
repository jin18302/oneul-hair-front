import { useSearchConditionContext } from "../hooks/UseSearchCondition";
import "../styles/Layout.css";
import type { ShopTag } from "../types/ShopTag";
import Header from "./Header";
import Article from "./Article";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";

export default function RootLayout() {

    const navigate = useNavigate();
    const { selectArea, selectTags } = useSearchConditionContext();

    const searchHandler = () => {
        const params = new URLSearchParams();

        if (selectArea != "전체") { params.set("area", selectArea); }
        if (selectTags.length != 0) { params.set("tagIdList", selectTags.map((t: ShopTag) => t.id).join(",")); }

        const navRequest = { pathname: "/search/shops", search: `?${params.toString()}` }
        navigate(navRequest);
    }

    return (
        <>
            <div className="layout-container">
                <Header searchHandler={searchHandler} />
                <Article />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}