import "../../styles/SearchArea.css";
import AreaFilter from "./area/AreaFllter";
import SearchButton from "./SearchButton";
import TagFilter from "./tag/TagFilter";


export default function SearchArea() {

     console.log("SearchArea rendering");
     
    return (
            <div className="search-container">
                <AreaFilter />
                <TagFilter />
               <SearchButton/>
            </div>
    )
}