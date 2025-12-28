import "../../styles/SearchArea.css";
import AreaFilterButton from "./area/AreaFllterButton";
import SearchButton from "./SearchButton";
import TagFilterButton from "./tag/TagFilter";


export default function SearchArea() {

     console.log("SearchArea rendering");
    return (
            <div className="search-container">
                <AreaFilterButton />
                <TagFilterButton />
               <SearchButton/>
            </div>
    )
}