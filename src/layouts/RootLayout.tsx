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

        const navRequest = { pathname: "/search", search: `?${params.toString()}` }
        navigate(navRequest); //검색버튼을 클릭하면 파람을 포함한 url로 이동된것처럼 사용자에게 보여준다.
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