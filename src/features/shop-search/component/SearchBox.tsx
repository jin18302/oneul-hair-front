import React from "react";
import AreaFilter from "./area/AreaFllter";
import SearchButton from "./SearchButton";
import TagFilter from "./tag/TagFilter";


 function SearchBox() {

     console.log("SearchArea rendering");
     
    return (
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-16 items-center
             bg-white border border-black h-15 rounded-[10px]">
                <AreaFilter />
                <TagFilter />
               <SearchButton/>
            </div>
    )
}

export default React.memo(SearchBox);
