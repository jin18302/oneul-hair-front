import { useNavigate } from "react-router";
import "../../styles/SearchArea.css";
import { useSearchConditionContext } from "../../hooks/UseSearchCondition";
import type { ShopTag } from "../../types/ShopTag";
import AreaFilterButton from "./area/AreaFllterButton";
import SearchButton from "./SearchButton";
import TagFilterButton from "./tag/TagFilterButton";
// import "../styles/FilterArea.css";




export default function SearchArea() {

     console.log("SearchArea rendering");

      const navigate = useNavigate();
    const { selectArea, selectTags } = useSearchConditionContext();

    const searchHandler = () => {
        console.log("search 핸들러 호출됨")
        const params = new URLSearchParams();

        if (selectArea != "전체") { params.set("area", selectArea); }
        if (selectTags.length != 0) { params.set("tagIdList", selectTags.map((t: ShopTag) => t.id).join(",")); }

        const navRequest = { pathname: "/search", search: `?${params.toString()}` }
        navigate(navRequest); //검색버튼을 클릭하면 파람을 포함한 url로 이동된것처럼 사용자에게 보여준다.
    }


    return (
            <div className="search-container">
                <div className="search"></div>
                <AreaFilterButton />
                <TagFilterButton />
               <SearchButton searchHandler={searchHandler}/>
            </div>
    )
}