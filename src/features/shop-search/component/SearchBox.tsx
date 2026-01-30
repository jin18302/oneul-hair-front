import React from "react";
import "../../styles/SearchArea.css";
import AreaFilter from "./area/AreaFllter";
import SearchButton from "./SearchButton";
import TagFilter from "./tag/TagFilter";


 function SearchBox() {

     console.log("SearchArea rendering");
     
    return (
            <div className="search-container">
                <AreaFilter />
                <TagFilter />
               <SearchButton/>
            </div>
    )
}

export default React.memo(SearchBox);
