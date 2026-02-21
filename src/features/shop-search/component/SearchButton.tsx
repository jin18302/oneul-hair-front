import { useNavigate } from "react-router";
import { searchConditionStore } from "../../../contexts/searchConditionStore";
import type { ShopTag } from "../../shop/type/entity";

export default function SearchButton() {

    console.log("SearchButton rendering");

    const navigate = useNavigate();
    
    const selectTags = searchConditionStore((s) => s.tagList);
    const selectArea = searchConditionStore((s) => s.selectArea);

    const searchHandler = () => {

        const params = new URLSearchParams();

        if (selectArea != null) { params.set("area", selectArea); }
        if (selectTags.length != 0) { 
            selectTags.map((t: ShopTag) => params.append("tagIdList", String(t.id))); 
        }

        const navRequest = { pathname: "/search", search: `?${params.toString()}` }
        navigate(navRequest); //검색버튼을 클릭하면 파람을 포함한 url로 이동된것처럼 사용자에게 보여준다.
    }

    return (
        <button className="col-start-3 col-end-4 row-start-1 row-end-2 bg-[#3e9aef] mr-2" onClick={searchHandler}>검색</button>
    )
}

