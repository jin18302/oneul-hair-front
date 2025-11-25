import "../styles/SearchArea.css";
import AreaFilterButton from "./AreaFllterButton";
// import "../styles/FilterArea.css";
import SearchButton from "./SearchButton";
import TagFilterButton from "./TagFilterButton";



export default function SearchArea({searchHandler}:{searchHandler:() => void}) {


    return (
            <div className="search-container">
                <div className="search"></div>
                <AreaFilterButton />
                <TagFilterButton />
               <SearchButton searchHandler={searchHandler}/>
            </div>
    )
}