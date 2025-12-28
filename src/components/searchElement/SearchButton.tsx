import { useNavigate } from "react-router";
import "../../styles/SearchArea.css"
import { useSearchConditionContext } from "../../hooks/UseSearchCondition";
import type { ShopTag } from "../../types/ShopTag";

export default function SearchButton() {

    console.log("SearchButton rendering");

    const navigate = useNavigate();
    const { selectArea, selectTags } = useSearchConditionContext();

    const searchHandler = () => {

        const params = new URLSearchParams();

        if (selectArea != null) { params.set("area", selectArea); }
        if (selectTags.length != 0) { params.set("tagIdList", selectTags.map((t: ShopTag) => t.id).join(",")); }

        const navRequest = { pathname: "/search", search: `? ${params.toString()}` }
        navigate(navRequest); //검색버튼을 클릭하면 파람을 포함한 url로 이동된것처럼 사용자에게 보여준다.
    }


    return (
        <button className="search-button" onClick={searchHandler}>검색</button>
    )
}